const mongoose = require("mongoose");

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