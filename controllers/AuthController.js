const util = require("util");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync")
const AppError = require("../utils/appError");
const sendEmail = require("../utils/email");
require("dotenv").config();


const signToken = id =>{
    return jwt.sign({id},process.env.SECRETKEY,
        {expiresIn : process.env.JWTEXPIRES_IN});
};

exports.signupUser = catchAsync(async(req,res,next)=>{
  
        const userSignup = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        conpassword: req.body.conpassword
    });

const token = signToken(userSignup._id);
    res.status(201).json({
        status: "Success",
        token,
        data:{
            userSignup: userSignup
        },
    });
})

exports.loginUser = catchAsync(async(req,res,next)=>{
    const { email,password } = req.body;

    //check if email and password exists
    if(!email || !password){
        return next(new AppError("Please provide email and password",400));
    }

    //check if user exist and password is correct

    const user = await User.findOne({ email }).select('+password');

    if(!user || !(await user.correctPassword(password,user.password))){
        return next(new AppError("Incorrect email and password"),401);
    }

    //if Ok then send token to user
    const token = signToken(user._id);
    res.status(200).json({
        status: "login successful",
        token
    })

})

exports.protect = catchAsync(async (req,res,next)=>{

    let token;
    //get the token and check if it exist
        if(req.headers.authorization 
            && req.headers.authorization.startsWith('Bearer')
        ){
            token = req.headers.authorization.split(' ')[1];
        }

        if(!token){
            return next(new AppError("You are not logged in!"),401)
        }
    //validate/verification the token
        const decoded = await util.promisify(jwt.verify)(token,process.env.SECRETKEY);

        
    //Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if(!currentUser){
        return next(new AppError("The user belonging to the token no longer exist",401));
    }


    //Check if user changed password after the token was issued
    if(currentUser.changedPasswordAfter(decoded.iat)){
        return next(new AppError("User recently changed password! Please log in again",400))
    };

   //Grant access to protected route
   req.user = currentUser;
    next();
});

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new AppError('You do not have permission to perform this action', 403)
        );
      }
  
      next();
    };
  };

  exports.forgetPassword = catchAsync (async (req,res,next)=>{
    //Get user based on email
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return next(new AppError("There is no user with that email address",404));
    }
    //Generate token
    const resetToken = user.createPasswordResetToken();
    await user.save({validateBeforeSave: false});

    //Send via email
    const resetUrl = `${req.protocol}://${req.get(
        'host'
      )}resetpassword/${resetToken}`;

      const message = `We see that you have forgotten your password. Reset it here ${resetUrl}`
      
      try{
        await sendEmail({
            email: user.email,
            subject: "Your password reset token (valid for 10 minutes)",
            message
          });
    
          res.status(200).json({
            status: "Success",
            message: "Token sent to email!"
          });

      } catch (err) {
        //Reset token and password reset expires
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });

        return next(new AppError("There was an error in sending the email."),500)

      }
    
  })

  exports.resetPassword = (req,res,next)=>{
    
}