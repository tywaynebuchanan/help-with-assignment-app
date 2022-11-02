const jwt       = require("jsonwebtoken");
const SECRETKEY    = process.env.SECRETKEY

const authenicate = (req,res,next) =>{
    try{
        const token = req.headers.authorization.split('')[1];
        const decode = jwt.verify(token,'H@ppyP(0');

        req.user = decode;
        next()
    }
    catch(error){
        res.status(400).json({
            message: "Authenication Failed"
        })
    }
}

module.exports = authenicate;