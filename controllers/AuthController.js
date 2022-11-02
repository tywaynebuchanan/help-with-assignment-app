const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync")


const signupUser = catchAsync(async(req,res,next)=>{
  
         const userSignup = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        conpassword: req.body.conpassword
    });

    const token = jwt.sign(
        {id: userSignup._id},
        process.env.SECRETKEY,
        {expiresIn : process.env.JWTEXPIRES_IN}
        )

    res.status(201).json({
        status: "Success",
        token,
        data:{
            userSignup: userSignup
        }
    })

   

})

module.exports = signupUser;