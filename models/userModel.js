const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

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
        minlength: 8,
        select: false
    },

    conpassword:{
        type: String,
        required:[true, "You need to confirm the password"],
        //This only works on CREATE and SAVE
        validate: {
            validator: function(el){
                return el === this.password
            },
            message: "Passwords are not the same"
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


}, {timestamps: true});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }

    this.password = await bcrypt.hash(this.password,12);
    this.conpassword = undefined;


})

//Compare if the password is correct
userSchema.methods.correctPassword = async function(enteredPassword,userPassword){
    return await bcrypt.compare(enteredPassword,userPassword)
}

const User = mongoose.model('users', userSchema);

module.exports = User;