const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const address = {
    addressLine1:{
        type:String,
        required:true
    },
    addressLine2:{
        type:String,
        required:false,
        default:"",
    },
    city:{
        type:String,
        require:true
    },
    state:{
        type:String,
        required:true,
    },
    pincode:{
        type:String,
        required:true
    },
    _id:false,
}

const cartSchema = new mongoose.Schema({
    productID:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    }
},
{
    _id:false
})
    
const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobileNo:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:false,
        default:"-"
    },
    address:{
        type:address,
    },
    role:{
        type:String,
        required:true,
        enum:["CUSTOMER","SELLER","ADMIN"]
    },
    token:{
        type:String,
        required:false
    },
    orders:{
        type:[mongoose.Types.ObjectId],
        required:false,
        default:[],
        ref:"orders"
    },
    wishlist:{
        type:[mongoose.Types.ObjectId],
        required:false,
        default:[],
        ref:"products"
    },
    blogs:{
        type:[mongoose.Types.ObjectId],
        required:false,
        default:[],
        ref:"blogs"
    },
    cart:{
        type:[cartSchema],
        required:false,
        default:[],
        ref:"products"
    }
}
)

// Pre-save hook to convert email to lowercase
UserSchema.pre('save', function(next) {
    if (this.isModified('email')) {
        this.email = this.email.toLowerCase();
    }
    if(this.isModified("password")){

    // Hashing the password using bcrypt package
    const hash = bcrypt.hashSync(this.password, 10);
        this.password = hash
    }
    next();
});


const userModel = mongoose.model("users",UserSchema)

module.exports = userModel;