const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRETKEY = process.env.SECRETKEY

const register = (req,res,next) =>{

    bcrypt.hash(req.body.password,10, (err,hashedPass)=>{
        if(err){
            res.status(404).json({
                message: "Unable to create the password"
            })
        }

        const user =  new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPass,
            phone: req.body.phone
        })
    
        user.save().then(user=>{
                res.status(200).json({
                    status:"Success",
                    message: "The user was created successfully"
                  
                })
            }).catch(err =>{
                res.status(404).json({
                    status:"Failed",
                    message: err
                })
            })

    })

}

const login = (req,res,next) =>{
    let username = req.body.username;
    let password = req.body.password;

    User.findOne({$or: [{email:username},{phone:username}]})
    .then(user =>{
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(err){
                    res.status(400).json({
                        message:err
                    })
                }

                if(result){
                    let token = jwt.sign({name: user.name},'H@ppyP(0',{expiresIn: '1h'})
                    res.status(200).json({
                        message: "Login Successfull",
                        token
                    })
                }else{
                    res.status(400).json({
                        message: "Password does not match"
                    })
                }
            })
        }else{
            res.status(400).json({
                message:"User not found!"
            })
        }
    })
}

module.exports = {register,login};
