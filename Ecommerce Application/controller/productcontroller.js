const productModel = require("../model/productModel")
const fs = require("fs")

const getProdcuts = async(req,res)=>{

    try{

     const productList = await productModel.find()

    return res.json({
        Odataset: productList
    })
    }catch(e){

        console.log(e);
        return res.json({
            message:"error",    
            err:e,
        })
    }   

}   



const productController = {
    getProdcuts,
}

module.exports = productController

