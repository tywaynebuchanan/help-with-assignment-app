const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync")

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