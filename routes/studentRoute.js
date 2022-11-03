const express = require("express");
const router = express.Router();
const StudentController = require("../controllers/StudentController");
const AuthController = require("../controllers/AuthController");

router.route("/").get(AuthController.protect,AuthController.restrictTo('admin'),StudentController.getAllStudents);
router.route("/addstudent").post(StudentController.createStudent);
router.route("/student/:id").get(StudentController.getStudentById);

module.exports = router
