const User = require("../models/userModel");

exports.getAllUsers = async (req,res,next) =>{
    
    try{
        const getAllUsers = await User.find();
        
        res.status(200).json({
           
            status: 'success',
            results: getAllUsers.length,
            data:{
                getAllUsers:getAllUsers
            }
        })

    }catch(err){
        res.status(400).json({
            status: "failed",
            message: "Could not get all users"
        })
    }
   
}

exports.getUserById = async (req,res,next) =>{
    
    try{
        const getUserById = await User.findById(req.params.id);
        res.status(200).json({
           
            status: 'success',
            data:{
                getUserById:getUserById
            }
        })

    }catch(err){
        res.status(400).json({
            status: "failed",
            message: "Could not get all users"
        })
    }
   
}

exports.createUser = async(req,res,next) =>{

    try{
        const newUser = await User.create(req.body);
        res.status(201).json({
            status: 'success',
            data:{
                newUser:newUser
            }
        })

    }catch(err){
        res.status(400).json({
            status: "failed",
            message: "Unable to create the new user"
        })
    }

}

exports.updateUser = async(req,res,next) =>{

    try{
        const updateUser = await User.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidators: true
        })
        res.status(201).json({
            status: 'success',
            data:{
               updateUser:updateUser
            }
        })

    }catch(err){
        res.status(400).json({
            status: "failed",
            message: "Unable to update the user"
        })
    }

}