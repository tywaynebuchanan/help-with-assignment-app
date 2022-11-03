const express = require("express");
const router = express.Router();
const ViewController = require("../controllers/ViewController")

router.route("/").get(ViewController.LoginPage);
router.route("/dashboard").get(ViewController.Dashboard);

module.exports = router