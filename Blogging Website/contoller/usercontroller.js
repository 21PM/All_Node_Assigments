const userModel = require("../model/usermodel")
const jsonwebtoken = require("jsonwebtoken")
const bcrypt = require("bcrypt");

const signUp = async (req,res)=>{

    const {email,password,name} = req.body;

    if(!email || !password || !name){
        return res.json({
            message:"Please provide email address , password and name"
        })
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);

    if(!isValidEmail){
        return res.json({
            message:"It is invalid email please enter valid email address"
        })
    }

    const saltRounds = 10;

    const hash = bcrypt.hashSync(password, saltRounds);

    const userdetails = {
        name:name,
        email:email,
        password:hash
    }

    try{
        const result = await userModel.create(userdetails)

        console.log(result);

        res.json({
            message:"Sign up api has been called"
        })
    }
    catch(e){
        return res.json({
            message:"something went wrong please try again",
            error:e.code === 11000 ? `Given email is already registered` : e,
        })
    }
}


const Login = async (req,res,next)=>{

    const {email,password} = req.body;
    
    const userdetails = await userModel.findOne({email:email})

    if(!userdetails){
        return res.json({
            message:"Email id is not registered"
        })
    }    
   const isPasswordVerfied = bcrypt.compareSync(password,userdetails.password)

   if(!isPasswordVerfied){
    return res.status(401).json({
        message:"Incorrect password, please enter correct password"
    })
   }

    const currentTime = Math.floor(new Date().getTime()/1000)
    const expiryTime = currentTime + 3600;

    const jsonPayload = {
        id:userdetails._id,
        email:userdetails.email,
        name:userdetails.name,
        exp:expiryTime

    }

    const token = jsonwebtoken.sign(jsonPayload,process.env.JSONSecretKey)

     await userModel.findByIdAndUpdate(userdetails._id,{$set:{
        token:token
    }})

    
    res.json({
        message:"Login api has been called",
        token:token
    })
}

const Logout = async(req,res)=>{

    console.log(req.currentUser);
    await userModel.findByIdAndUpdate(req.currentUser._id,{$set:{token:""}})
        return res.json({
            message:"logout api"
        })
}


const userController = {
    signUp,
    Login,
    Logout
}

module.exports = userController