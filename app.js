const express = require("express");
const app = express();
const userRoute = require("./routes/userRouter");
const auth = require("./routes/authRouter");
const RegisterUserController = require("./controllers/RegisterUserController");
const morgan = require("morgan");
const path = require("path");
const nodermailer = require("nodemailer");
const DB = require("./database/dbconfig");
const bodyParser = require("body-parser");
require('dotenv').config();


//Database Connection 
DB.on('error', (err)=>{
    console.log(err)
})

DB.once('open',()=>{
    console.log("DB connected success");
})

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//View Engine
app.set('view engine','ejs');

//Load Assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

//Routes
app.get("/",(req,res)=>{
    res.render("pages/index")
})

app.get("/register",(req,res)=>{
    res.render("pages/register")
})


app.post("/register",RegisterUserController)

module.exports = app;