const Student = require("../models/studentModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");


exports.getAllStudents = catchAsync(async (req,res,next)=>{
    const getAllStudents = await Student.find();

    if(!getAllStudents){
        return next(new AppError("No students found"),404)
    }

    res.status(200).json({
        results: getAllStudents.length,
        status: "Success",
        data:{
            getAllStudents:getAllStudents
        }
    })
})

exports.getStudentById = catchAsync(async(req,res,next)=>{

    const getStudentById = await Student.findById(req.params.id);

    if(!getStudentById){
        return next(new AppError("We could not find a student by that id",404))
    }

    res.status(200).json({
        status: "Success",
        data:{
            getStudentById:getStudentById
        }
    })

})

exports.createStudent = catchAsync(async (req,res,next)=>{
    const createStudent = await Student.create(req.body);

    res.status(201).json({
        status: "Success",
        data: {
            createStudent
        }
    })
})