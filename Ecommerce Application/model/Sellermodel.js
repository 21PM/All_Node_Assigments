const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const sellerSchema = new mongoose.Schema({
    sellerEmail:{
        type:String,
        required:true,
        unique:true
    },
    SellerMobile:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    GSTNO:{
        type:String,
        required:true,
        unique:true

    }
})


sellerSchema.pre("save",function (next){
    
    if(this.isModified("sellerEmail")){
        this.sellerEmail = this.sellerEmail.toLowerCase();
    }
    if(this.isModified("password")){
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(this.password,salt)
            this.password = hashedPassword;
  
    }
    next()
})

const sellerModel = mongoose.model("sellers",sellerSchema)

module.exports = sellerModel;