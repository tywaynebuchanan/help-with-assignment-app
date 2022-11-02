const nodemailer = require("nodemailer");

const sendMail = async (email)=>{
const transporter = nodemailer.createTransport({
    service: process.env.MAILSERVICE,
    auth:{
    user:process.env.MAILUSERNAME,
    pass:process.env.MAILPASSWORD
    }
    
    });
    
    const options = {
        from: "devsjamaica@outlook.com",
        to: email,
        subject:"Thank you for Registering",
        text:"Thank you for signing up for our site!",
        html: "<p>Thank you for signing up for our site!</p>"
        }
    
        await transporter.sendMail(options,(err,info)=>{
            if(err){
            console.log(err);
            return;
            }
            
            res.render("pages/index")
            console.log("Sent" + info.response)
            })
   

}


module.exports = sendMail