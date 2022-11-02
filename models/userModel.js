const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({

    email:{
        type: String,
        required: [true,"A valid email is required"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail,"Please provide a valid email"]
    },

    password:{
        type: String,
        required:[true, "A password is required"],
        minlength: 8
    },

    conpassword:{
        type: String,
        required:[true, "The password does not match"],
        //This only works on CREATE and SAVE
        validate: {
            validator: function(el){
                return el === this.password
            }
        }
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

const User = mongoose.model('users', userSchema);

module.exports = User;