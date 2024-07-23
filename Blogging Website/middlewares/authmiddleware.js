const userModel = require("../model/usermodel")
const jsonwebtoken = require("jsonwebtoken")
const bcrypt = require("bcrypt");

const authMiddleWare = async (req,res,next)=>{
    const Bearertoken = req.headers.authorization;
    if(!Bearertoken){
        return res.status(403).json({
            message:"please login invalid token"
        })
    }

    const token = Bearertoken.split(" ")[1];
    // console.log("tk",token);
    
    try{
        const isOurToken =  jsonwebtoken.verify(token,process.env.JSONSecretKey)
        
        const tokendata  = jsonwebtoken.decode(token)
        
        const currentUser = await userModel.findById(tokendata.id)

        if(!currentUser.token.length > 0){
            return res.json({
                message:"Session forcefully Expired please login again"
            })
        }

        req.currentUser = currentUser;
        next()

    }catch(e){
        console.log(e);
        return res.json({
            message:"Error Occured Invalid Token please login again",
            error:e
        })
    }
}



module.exports = authMiddleWare;
