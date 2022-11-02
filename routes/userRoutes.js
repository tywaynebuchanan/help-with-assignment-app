const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.route("/users").get(UserController.getAllUsers);
router.route("/user/:id").get(UserController.getUserById).patch(UserController.updateUser);


module.exports = router;