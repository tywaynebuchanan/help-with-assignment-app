const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({

    email:{
        type: String,
        required: [true,"A valid email is required"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail,"Please provide a valid email"]
    },

    role:{
        type: String,
        enum:['teacher','admin','sadmin','parent','user'],
        default: 'user'
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
    },

    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date

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

userSchema.methods.changedPasswordAfter = function(JWTTimestamp){
    if(this.passwordChangedAt){
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime()/1000,10);
        // console.log(this.passwordChangedAt,JWTTimestamp)
        return JWTTimestamp < changedTimestamp
    }
    return false;
}

userSchema.methods.createPasswordResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.createHash('sha256')
    .update(resetToken)
    .digest('hex');

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
}

const User = mongoose.model('users', userSchema);

module.exports = User;