const ProductModel = require("../model/productModel")
const userModel = require("../model/usermodel")

const getWishlist = async(req,res)=>{


    try{    
        const userwishlist = await userModel.findById(req.currentUser._id).select("wishlist").populate("wishlist")

        return res.json({
            wishlist : userwishlist
        })

    }catch(e){
        console.log(e);
        return res.json({
            message:"Something went wrong"
        })
    }

    
}

const addWishList = async (req,res)=>{

    const id = req.body.id;
    if(!id){
        return res.json({
            message:"product id not found"
        })
    }

    console.log(req.currentUser._id);

    try{
        const productDetails = await ProductModel.findById(id)        
        if(!productDetails){
            return res.json({
                message:"product id not found"
            })
        }

        if(req.currentUser.wishlist.includes(id)){
            return res.json({
                message:"Item already added in wishlist"
            })
        }

        const AddItemsInWishist = await userModel.findByIdAndUpdate(req.currentUser._id,{
            $push:{
                wishlist:productDetails._id,
            }
        })

        if(!AddItemsInWishist){
            return res.json({
                message:"Unable to add wishList account not found"
            })
        }

        return res.json({
            status:true,
            message:"Item has been added in your wishlist",
            product:productDetails  
        })
    
    }catch(e){
        return res.status(404).json({
            message:'Unable to add this item in wishlist, Id not found',
            error:e
        })
    }

  
}


const deleteWishlist = async(req,res)=>{
    const id = req.body.id;

    if(!id){
        return res.json({
            message:"Please provide the ID"
        })
    }

    try{
        const checkWatchList = await userModel.findById(req.currentUser._id);
        
        if(!checkWatchList){
            return res.json({
                message:"USer not found",
                error:e
            })
        }
       
        if(!(checkWatchList.wishlist.includes(id))){
            return res.json({
                message:"Item not found in your wishlist"
            })
        }

        const deleteItem = await userModel.findByIdAndUpdate(req.currentUser._id,{
            $pull:{
                wishlist:id
            }
        })

        console.log(deleteItem);

        return res.json({
            message:'Item has been removed from wishlist'
        })

    }catch(e){
        return res.json({
            message:"Error while deleting the items from wishlist",
            error:e
        })
    }
}


const wishlistController = {
    getWishlist,
    addWishList,
    deleteWishlist
}
module.exports = wishlistController