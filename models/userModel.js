const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    email:{
        type: String,
        required: [true,"A user name is required"]
    },

    password:{
        type: String,
        required:[true, "A password is required"]
    },

   
    name:{
        type:String
    },

    phone:{
        type: String
    },

    avatar:{
        type: String,
    }


}, {timestamps: true})

const User = mongoose.model('Tank', userSchema);

module.exports = User;