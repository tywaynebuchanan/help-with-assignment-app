const mongoose = require("mongoose");
const moment = require("moment");

const studentSchema = new mongoose.Schema({

    firstname:{
        type: String,
        required:[true, "The first name of the student is required"]
    },

    middlename:{
        type: String,
        // required:[true, "The first name of the student is required"]
    },


    lastname:{
        type: String,
        required:[true, "The lastname of the student is required"]
    },

    dob: {
        type: Date,
        required: [true,"A valid date of birth is required"],
        trim: true,
        min: moment.utc("2020-01-01"),

    },

    gender:{

        type: String,
        required:[true,"A valid gender is required"],
    },

    photo:{
        type: String
    },

    religion:{
        type:String
    }

})

const Student = mongoose.model('students', studentSchema);

module.exports = Student;