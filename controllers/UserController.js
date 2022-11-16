const User = require("../models/userModel");
const AppError = require("../utils/appError");
const AuthController = require("../controllers/AuthController");
const catchAsync = require("../utils/catchAsync")

//Function to filter the body
const filterObj=(obj, ...allowedFields)=>{

}

exports.getAllUsers = catchAsync(async (req,res,next) =>{
        const getAllUsers = await User.find();

        if(!getAllUsers){
            return next(new AppError("No results found"),404);
        }
        res.status(200).json({
            status: 'success',
            results: getAllUsers.length,
            data:{
                getAllUsers:getAllUsers
            }
        })
})

exports.getUserById = catchAsync(async (req,res,next) =>{
        const getUserById = await User.findById(req.params.id);
        if(!getUserById){
            return next(new AppError("No user found by that id",404));
        }

        res.status(200).json({
            status: 'success',
            data:{
                getUserById:getUserById
            }
        })
})

exports.updateUser = catchAsync(async(req,res,next) =>{
        const updateUser = await User.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidators: true
        })
        if(!updateUser){
            return next(new AppError("Unable to update the user by that id",404));
        }

        res.status(201).json({
            status: 'success',
            data:{
               updateUser:updateUser
            }
        })


})

exports.updateMe = catchAsync(async(req,res,next)=>{
    //Create error if user post Password data
    if(req.body.password || req.body.conpassword){
        return next(new AppError("We are unable to update your password.",400))
    }

    //Update user information 
    const filteredBody = filterObj(req.body,'name','email');
    const updatedUser = await User.findByIdAndUpdate(req.user.id,filteredBody,
        {
            new: true,
            runValidators: true
        }
        );


    res.status(200).json({
        status: 'success',

    });
})



