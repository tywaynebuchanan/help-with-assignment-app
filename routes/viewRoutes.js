const express = require("express");
const router = express.Router();
const ViewController = require("../controllers/ViewController")
const AuthController = require("../controllers/AuthController");

router.use(AuthController.isLoggedIn);
router.route("/").get(ViewController.LoginPage);
router.route("/dashboard").get(ViewController.Dashboard);
router.route("/settings").get(ViewController.Preferences);
router.route("/child-info").get(ViewController.Child);
router.route("/payments").get(ViewController.Payments);

module.exports = router