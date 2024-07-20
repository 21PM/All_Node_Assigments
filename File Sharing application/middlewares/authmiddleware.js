const jwt = require('jsonwebtoken');

const AuthMiddleWare = async (req,res,next)=>{

    const BearerToken = req.headers.authorization;
    if(!BearerToken){
        return res.status(403).json({
            message:"Please login to upload the file"
        })
    }

    try{
    const token = BearerToken.split(" ")[1];
    const isOurToken = jwt.verify(token,process.env.jwt_secret_key)
    
    }
    catch(e){
        return res.status(403).json({

            message:e.message === "jwt expired" ? "Session has been expired please login again" : "Incorrect token please login again",
            error:e,
        })
    }
    next()

}


module.exports = AuthMiddleWare;