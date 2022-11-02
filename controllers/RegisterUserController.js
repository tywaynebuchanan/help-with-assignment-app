const nodemailer = require("nodemailer");



const sendMail = (req,res)=>{
    const senderEmail = "devsjamaica@outlook.com"
    const name = req.body.name;
    const email = req.body.email;
    
    const transporter = nodemailer.createTransport({
    service: process.env.MAILSERVICE,
    auth:{
    user:process.env.MAILUSERNAME,
    pass:process.env.MAILPASSWORD
    }
    
    });
    
    const options = {
    from: senderEmail,
    to: email,
    subject:"Thank you for Registering",
    text:"Thank you for signing up for our site!",
    html: "<p>Thank you for signing up for our site!</p>"
    }
    
    const sendMail = transporter.sendMail(options,(err,info)=>{
    if(err){
    console.log(err);
    return;
    }
    
    res.render("pages/index")
    console.log("Sent" + info.response)
    })

}


module.exports = sendMail