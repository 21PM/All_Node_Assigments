const bcrypt = require('bcrypt')
const jwt  = require("jsonwebtoken");
const ProductModel = require("../model/productModel")
const sellerModel = require("../model/Sellermodel")

const sellerSignup = async (req,res)=>{

    const {sellerEmail,SellerMobile,name,GSTNO,password} = req.body;


    if(!sellerEmail || !SellerMobile || !name || !GSTNO , !password){
        return res.json({
            message:"Please provide all details for your account registration"
        })
    }

    const newSellerdata = {
        sellerEmail,
        SellerMobile,
        password,
        name,
        GSTNO
    }

    try{
        const saveNewSeller = await sellerModel.create(newSellerdata)
        if(!saveNewSeller){
            return res.json({
                message:"Something went wrong while saving your data"
            })
        }
        return res.status(200).json({
            message:'You have succesfully registered your seller account'
        })

    }catch(e){
        return res.status(403).json({
            message:"Unable to signup something went wrong",
            error:e
        })
    }

    
}


const sellerLogin = async (req,res)=>{

    const {email,password} = req.body;

    if(!email || !password){
        return res.status(403).json({
            message:"Please provide both email id and password"
        })
    }

    try{
        
        const isSeller = await sellerModel.find({sellerEmail:email})
        if(!isSeller){
            return res.status({
                message:"You email id is not registered as a seller account"
            })
        }
  
        const isValidPassword  = bcrypt.compareSync(password,isSeller[0].password)

        if(!isValidPassword){
            return res.status(402).json({
                message:"Unable to login, Invalid Password"
            })
        }

        const currenTime = Math.floor(new Date().getTime()/1000);

        const expiryTime = currenTime + 3600;

        const jsonPayload = {
            SellerId:isSeller[0]._id,
            sellerEmail:isSeller[0].sellerEmail,
            exp:expiryTime
        }

       const token = jwt.sign(jsonPayload,process.env.JWTSecretKey)

        return res.status(200).json({
            message:"You are successfully logged In",
            SellerToken:token
        })


    }catch(e){
            return res.json({
                message:'Something went wrong please'
            })
    }

    
}


const AddProducts = async (req,res)=>{


    try{
     
       const addedProduct = await ProductModel.create({...req.body,sellerId:req.seller._id})
        
    }catch(e){
            return res.status(403).json({
                message:"Please proivde all the required fields to add your product",
                error:e
            })
    }
    
    return res.json({
        data:"Add Products"
    })
}

const deleteProducts = async (req,res)=>{

    const productId = req.params.productID
    if(!productId){
        return res.status(403).json({
            message:"Please provide the product Id of"
        })
    }
    try{   

        const isSellerAuth = await ProductModel.findById(productId)
        
        if(!isSellerAuth.sellerId.equals(req.seller._id)){
            console.log("asdsd");
            return res.json({
                message:"You are not authorised to delete the product, Only seller himself can delete the prodcut"
            })
            console.log("pas");
        }

        const deleteProduct = await ProductModel.findByIdAndDelete(productId)
        if(!deleteProduct){
            return res.status(404).json({
                message:`Given product id not found ${productId}`
            })
        }
        return res.status(200).json({
            message:'Product has been deleted'
        })

        // return res.status


    }catch(e){
    
        return res.json({
            message:"Unable to delete the product you are not authorised from catch",
            error:e
        })
    }

    
}

const updateProducts = async (req,res)=>{

    const productId = req.params.productID
  

    try{

        const isAuthSeller = await ProductModel.findById(productId);
          
        if(!isAuthSeller){
            return res.status(404).json({
                message:"Given Product Id not found"
            })
        }

        if(!(isAuthSeller.sellerId.equals(req.seller._id))){
            return res.json({
                message:`You are not authorised to update the product`
            })
        }

        const updatedData = await ProductModel.findByIdAndUpdate(productId,req.body,({new:true,runValidators:true}))
       
        if(!updatedData){
            return res.status(404).json({
                message:"Given Product Id not found"
            })
        }

    }catch(e){
        return res.json({
            message:"Error update the product"
        })
    }

    return res.json({
        message:`You Product id${productId} has been updated`
    })
}

const sellerContoller = {
    sellerSignup,
    sellerLogin,
    AddProducts,
    deleteProducts,
    updateProducts
}

module.exports = sellerContoller