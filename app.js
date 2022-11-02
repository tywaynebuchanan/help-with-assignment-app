const express = require("express");
const app = express();
const userRoute = require("./routes/userRouter");
const auth = require("./routes/authRouter");
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



app.post("/register",(req,res)=>{
       const output = `
        <p>New User</p>
        <h3>Contact Details</h3>
        <ul>
            <li>Name:${req.body.name}</li>
            <li>Email/Username:${req.body.email}</li>
            <li>Password:${req.body.password}</li>
            <li>Name:${req.body.conpassword}</li>
        </ul>
    `
    const transporter = nodermailer.createTransport({
    service: "outlook",
    auth:{
        user:"devsjamaica@outlook.com",
        pass:"jamaica1"
    }
   
});

const options = {
    from: "devsjamaica@outlook.com",
    to: "tywaynebuchanan@gmail.com",
    subject:"This is a test",
    text:"Wow this works!",
    html: output
}

transporter.sendMail(options,(err,info)=>{
    if(err){
        console.log(err);
        return;
    }
    
    res.render("pages/index")
    console.log("Sent" + info.response)
})
})

// app.use("/",RegisterRoute);

module.exports = app;