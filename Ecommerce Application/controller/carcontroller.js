const ProductModel = require("../model/productModel");
const userModel = require("../model/usermodel")

const addToCart = async (req,res)=>{

    const data = req.body;
    const {productID,title,quantity} = req.body;

    if(!productID || !title || !quantity){
        return res.json({
            message:"Please complete details i.e productID, title and quantity"
        })
    }

    try{
        const updateData = await ProductModel.findOne(
            {
                _id: data.productID,
                stock: { $gte: data.quantity }
            },
        );
        if(!updateData){
            return res.json({
                message:"Quantity is out of stock or Product ID not found"
            })
        };

        const updateCart = await userModel.findByIdAndUpdate(req.currentUser._id,{
            $push:{
                cart:req.body
            }
        })  
        

    }catch(e){
        console.log(e);
            return res.json({
                message:"something went wrong"
            })
    }
    

    return res.json({
        message:"Cart has been added"
    })
}


const deleteCart = async (req,res)=>{

    const data = req.body;
    const {productID} = req.body;

    if(!productID){
        return res.json({
            message:"Please complete details i.e productID, title and quantity"
        })
    }

    try{
        const currentUserDetails = await userModel.findById(req.currentUser._id)
       const newCartData =  currentUserDetails.cart.filter((ele,i)=>{
        return ele.productID.toString() !== req.body.productID;
        })
        const updateNewCart = await userModel.findByIdAndUpdate(req.currentUser._id,{
            $set:{
                cart:newCartData
            }
        })

        if(newCartData.length === 0){
            return res.json({
                message:"Your cart is empty"
            })
        }

        return res.json({
            message:`your item (Product ID ${productID}) has been deleted from cart`
        })

    }catch(e){

    }

    return res.json({
        message:"delete cart"
    })
}



const cartController = {
    addToCart,
    deleteCart
}

module.exports = cartController;