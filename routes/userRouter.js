const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const authenicate = require("../middleware/authenicate")

//get all users
router.get("/users",authenicate,UserController.getAllUsers)
//get users by id
router.get("/user/:id",authenicate,UserController.getUserById);
//update users
router.patch("/user/:id",authenicate,UserController.updateUser);


module.exports = router;
