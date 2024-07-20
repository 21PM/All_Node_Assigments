const userModel = require('../model/usermodels')
const bcrypt = require("bcrypt");
const { response } = require('express');
const jwt = require("jsonwebtoken")

const registerUser = async (req,res,next)=>{

    const salt = bcrypt.genSaltSync(10);


    if(!req.body.name){
        return res.json({
            message:"Please provide name for registration"
        })
    }
    if(!req.body.email){
        return res.json({
            message:"Please provide email for registration"
        })
    }
    if(!req.body.mobileNo){
        return res.json({
            message:"Please provide mobileNo for registration"
        })
    }
    if(!req.body.password){     
        return res.json({
            message:"Please provide password for registration"
        })
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, salt); 

        const usersData = {
            name:req.body.name,
            email:req.body.email,
            mobileNo:req.body.mobileNo,
            password:hashedPassword
        }
        
        try{
            const storedData = await userModel.create(usersData)
        }catch(e){
            return res.json({
                message:"Unable to register your account",
                error:e.keyValue["mobileNo"] ? "Given Mobile number is already registered please login" : "Given Email id is already registered please login"
            })
        }
       
  
        res.json({
        message:"register api called"
        })
}

const loginUser = async (req,res)=>{

    const {email,password} = req.body;

    const userdata = await userModel.findOne({email:email})
    if(!userdata){
        return res.status(404).json({
                message:"User not found with given email address please register"
        })
    }

    const result = bcrypt.compareSync(password, userdata.password); // true

   if(result){
    const currentTimeinSeconds = Math.floor(new Date().getTime()/1000);

   const expiryTime = currentTimeinSeconds + 3600;

    const jwtPayload = {
        userName:userdata.name,
        email:userdata.email,
        mobileNo:userdata.mobileNo,
        exp:expiryTime
    }
    const token = jwt.sign(jwtPayload,process.env.jwt_secret_key)

    const UpdatedData = await userModel.findByIdAndUpdate(userdata._id,{$set:{"token":token }})
    
    req.userdata = userdata;
    return res.json({
            message:"You are logined successfully",
            token:token,
            result:userdata
        })

   }else{
        return res.json({
            message:"Password doesn't match Please enter correct password"
            
        })
   }

   
    
}


const userController = {
    registerUser,
    loginUser
}

module.exports = userController;