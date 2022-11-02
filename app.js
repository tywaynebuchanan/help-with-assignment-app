const express = require("express");
const app = express();
//Routes
const userRoutes = require("./routes/userRoutes");
const homeRoute = require("./routes/homeRouter");
const RegisterUserController = require("./controllers/RegisterUserController");
const AuthController = require("./controllers/AuthController");
const morgan = require("morgan");
const path = require("path");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController")
const DB = require("./database/dbconfig");
const bodyParser = require("body-parser");
const sendMail = require("./controllers/RegisterUserController");
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
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))

//Routes

app.use("/",userRoutes);
app.use("/:id",userRoutes);
app.use("/",homeRoute)
// app.use("/dashboard",homeRoute)

app.get("/register",(req,res)=>{
    res.render("pages/register")
})



app.post("/register",AuthController.signupUser,sendMail)
app.post("/login",AuthController.loginUser);


app.all('*',(req,res,next)=>{
    next(new AppError(`Cant find ${req.originalUrl} on this server`,404))
})

app.use(globalErrorHandler);



module.exports = app;