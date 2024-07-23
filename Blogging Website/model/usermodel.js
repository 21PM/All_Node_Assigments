const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
    
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    token:{
        type:String,
        required:false,
    },
    myposts:{
        type:[mongoose.Types.ObjectId],
        default:[],
        required:false,
        ref:"posts"
    }
})

const userModel = mongoose.model("users",userschema)

module.exports = userModel;