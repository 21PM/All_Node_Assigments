const userModel = require("../model/usermodel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer")
const dotenv = require("dotenv")
    dotenv.config()


//   const transporter = nodemailer.createTransport({
//     // service: "Gmail",
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,
//     auth: {
//         user: process.env.MY_Ecom_Gmail_App_Id, // Your Gmail address
//         pass: process.env.MY_Ecom_Gmail_App_pass  // Your Gmail password (consider using an App Password for security)
//     }
//   });
  const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user:process.env.MY_Ecom_Gmail_App_Id,
        pass:process.env.MY_Ecom_Gmail_App_pass
    },
    secure: true,
    port: 465
});

const SignUp = async(req,res)=>{    

    console.log(req.body);

    try{    
        const SaveNewUserData = await userModel.create({...req.body,role:"CUSTOMER"});
        console.log(SaveNewUserData);
        if(!SaveNewUserData){
            return res.json({
                message:"Error while registration"
            })
        }
        return res.json({
            message:"Registration done successfully"
        })

    }catch(e){
        console.log(e);
        return res.status(403).json({
            status:false,
            message:"Unable to save data",
            error:e
        })
    }

 
}

const Login = async(req,res)=>{

    const {email,password} = req.body;

    try{
        const currentUser = await userModel.find({email:email})
        if(currentUser.length === 0){
            return res.json({
                status:false,
                message:"Give email id is not registered kindly register"
            })
        }   
        const isValidPassword = bcrypt.compareSync(password,currentUser[0].password)
        
        if(!isValidPassword){
            return res.status(403).json({
                status:false,
                message:"Invalid User Id and password"
            })
        }

        const currentTimeInSeconds = Math.floor(new Date().getTime() / 1000);
        
        const expiryTime = currentTimeInSeconds + 3600;



        const jsonPayload = {
            userId:currentUser[0]._id,
            email:currentUser[0].email,
            role:currentUser[0].role,  
            exp:expiryTime
        }

        const token = jwt.sign(jsonPayload,process.env.JWTSecretKey)

        const updateToken  = await userModel.findByIdAndUpdate(currentUser[0]._id,{
            token:token
        })  


        return res.json({
            message:"You have sucessfully logged In",
            token:token
        })


    }catch(e){
        return res.status(403).json({
            status:false,
            message:"Unable to login",
            error:e
        })
    }

}


const Logout = async(req,res)=>{
   
    const currentUser  = req.currentUser;

   try{
    const deleteToken = await userModel.findByIdAndUpdate(currentUser._id,{
        token:null
    })
    return res.status(200).json({
        status:true,
        message:`${currentUser.email} this account is succesfully logged out`,

    })
   }catch(e){
    return res.status(403).json({
        status:false,
        message:"Error while logging out",
        error:e
    })
   }

  
}

const forgetPassword = async (req,res)=>{

    const {email} = req.body;



    if(!email){
        return res.status(400).json({
                status:false,
                message:"Please provide email address"
        })
    }

    try{    
        const IsvalidEmail = await userModel.findOne({email:email})

        if(!IsvalidEmail){
            return res.status(404).json({
                status:false,
                message:"Given Email Id is not registered with us, kindly register"
            })
        }

        const resetPasswordLink = "http://localhost:10000/ecom/reset-password"

        const mailOptions = {
            from:process.env.MY_Ecom_Gmail_App_Id,
            to: email,
            subject: 'Password Reset Request',
            html: `
                <p>You requested a password reset.</p>
                <p>Click the link below to reset your password:</p>
                <a href="http://localhost:10000/ecom/reset-password">Reset Password</a>
                <p>This link is valid for 1 hour.</p>
            `
          };

         transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error("Error sending email: ", error);
            } else {
              console.log("Email sent: ", info.response);
            }
          });
          return res.json({
            status:true,
            message:"Please check your email to reset yout password"
        })

    }catch(e){
            return res.json({
                status:false,
                message:"Error while reseting the password",
                error:e.message
            })
    }

   
}

const resetPassword = async(req,res)=>{

    return res.json({
        mssage:'Reset password api '
    })
}

const userController = {
    SignUp,
    Login,
    Logout,
    forgetPassword,
    resetPassword
}

module.exports = userController