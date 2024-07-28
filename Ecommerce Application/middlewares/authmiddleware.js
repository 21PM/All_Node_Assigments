const userModel = require("../model/usermodel")
const jwt = require('jsonwebtoken')
const authMiddleWare = async(req,res,next)=>{

    const bearerToken = req.headers.authorization;
   
    if(!bearerToken){
        return res.status(403).json({
            status:false,
            message:"Please login, token not found"
        })
    }
   
    const token = bearerToken.split(" ")[1];

    try{
        const tokenData = jwt.verify(token,process.env.JWTSecretKey)
        
        const isUserValid = await userModel.findById(tokenData.userId)

        if(!isUserValid){
            return res.status(403).json({
                status:"false",
                message:"Invalid User, Please login"
            })
        }
        if(isUserValid.token === null){
            return res.status(403).json({
                status:false,
                message: "Token is no longer valid. Please login again."
            })
        }
        req.currentUser = isUserValid;
        next()

    }catch(e){
        return res.status(403).json({
            status:false,
            message:"Token Invalid or expired Please Login again"
        })
    }
   
}

module.exports = authMiddleWare;