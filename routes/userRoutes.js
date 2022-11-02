const express = require("express");
const multer = require("multer");
const router = express.Router();
const UserController = require("../controllers/UserController");


const upload = multer({
    dest: 'assets/img/users'
})

router.route("/users").get(UserController.getAllUsers);
router.route("/user/:id").get(UserController.getUserById).patch(UserController.updateUser);

// router.route("/updateMe",upload.single('photo'),UserController.updateMe);


module.exports = router;