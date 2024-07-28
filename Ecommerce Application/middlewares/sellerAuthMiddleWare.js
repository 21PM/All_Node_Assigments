const jwt = require("jsonwebtoken");
const sellerModel = require("../model/Sellermodel")

const sellerAuthMiddleWare = async (req,res,next)=>{

    const bearerToken = req.headers.authorization;
    if(!bearerToken){
        return res.status(402).json({
            message:"Please Login Token not present"
        })
    }

    const token =  bearerToken.split(" ")[1];
     
    
    try{
        const isOutToken = jwt.verify(token,process.env.JWTSecretKey)

    if(!isOutToken){
        return res.status(404).json({
            message:'Please login again token is invalid'
        })
    }
        const sellerData = await sellerModel.findById(isOutToken.SellerId)
    if(!sellerData){
        return res.status(404).json({
            message:"Seller Not found"
        })
    }
    req.seller = sellerData;
    next()
    }catch(e){
        return res.json({
            message:"Unable to login something went wrong",
            error:e,
        })
    }
}   



module.exports = sellerAuthMiddleWare
