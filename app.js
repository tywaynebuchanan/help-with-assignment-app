const express = require("express");
const app = express();
//Routes
const userRoutes = require("./routes/userRoutes");
const studentRouter = require("./routes/studentRoute");
const viewRouter = require("./routes/viewRoutes");

const morgan = require("morgan");
const path = require("path");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController")
const DB = require("./database/dbconfig");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
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
app.use(express.json({limit: '10kb'}));
app.use(cookieParser());

//View Engine
// app.set('view engine','ejs');
app.set('view engine','pug')
app.set("views",path.join(__dirname,"views"));

//Load Assets
app.use('/css', express.static(path.join(__dirname, "assets/css")))
app.use('/js', express.static(path.join(__dirname, "assets/js")))
app.use('/img', express.static(path.join(__dirname, "assets/img")))

//Routes

app.use("/",viewRouter);
app.use("/",userRoutes);
app.use("/",userRoutes);
app.use("/students",studentRouter);
app.use("/",studentRouter);

// app.get("/", (req,res)=>{
//     res.status(200).render("base");
// })
app.get("/register",(req,res)=>{
    res.render("pages/register")
})

app.all('*',(req,res,next)=>{
    next(new AppError(`Cant find ${req.originalUrl} on this server`,404))
})

app.use(globalErrorHandler);



module.exports = app;