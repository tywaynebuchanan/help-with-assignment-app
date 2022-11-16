const express = require("express");
const multer = require("multer");
const router = express.Router();
const UserController = require("../controllers/UserController");
const AuthController= require("../controllers/AuthController");

router.post("/login",AuthController.loginUser);
router.post("/register",AuthController.signupUser);
router.patch("/updatemypassword",AuthController.protect,AuthController.updatePassword);
router.patch("/updateme",AuthController.protect,UserController.updateMe);

router.patch("/resetpassword/:token",AuthController.resetPassword)
router.post("/forgetpassword",AuthController.forgetPassword)

router.route("/users").get(UserController.getAllUsers);
router.route("/user/:id").get(UserController.getUserById).patch(UserController.updateUser);



// router.route("/updateMe",upload.single('photo'),UserController.updateMe);


module.exports = router;