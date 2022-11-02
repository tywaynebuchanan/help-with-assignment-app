const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync")
const AppError = require("../utils/appError");


const signToken = id =>{
    return jwt.sign(
        {id:id},
        process.env.SECRETKEY,
        {expiresIn : process.env.JWTEXPIRES_IN}
        )
}

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
    const {email,password} = req.body;

    //check if email and password exists
    if(!email || !password){
        return next(new AppError("Please provide email and password",404));
    }

    //check if user exist and password is correct

    const user = await User.findOne({email:email}).select('+password');

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