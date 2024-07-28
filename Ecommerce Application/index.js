const express = require("express");
const mongoose = require("mongoose")
const userRoutes = require("./routes/userroutes");
const productRoutes = require("./routes/productsroutes")
const sellerroutes = require("./routes/sellerRoutes")
const wishlistroutes = require("./routes/wishlistroutes")
const blogRoutes = require("./routes/blogsRoutes")
const carRoutes = require("./routes/cartRoutes")
const dotenv = require("dotenv");

const app = express();

dotenv.config()

mongoose.connect(process.env.DataBaseURI).then(()=>{
    console.log("DB has been connnected");
}).catch((e)=>{
    console.log(`unable to connect to db error ${e}`);
})
app.use(express.json())



app.use("/ecom",userRoutes)
app.use("/products",productRoutes)
app.use("/seller",sellerroutes)
app.use("/products",wishlistroutes)
app.use("/blogs",blogRoutes)
app.use("/cart",carRoutes)

app.listen(10000,()=>{
    console.log("Server is up at port number 10000");
})
