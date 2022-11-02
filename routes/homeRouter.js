const express = require("express");
const router = express.Router();
const HomeController = require("../controllers/HomeController")

router.route("/").get(HomeController.LoginPage);
router.route("/dashboard").get(HomeController.Dashboard);
module.exports = router;


