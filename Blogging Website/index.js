const express = require("express");
const userRoutes = require("./routes/userroutes")
const postRoutes = require("./routes/postroutes")
const commentRoutes = require("./routes/commentroutes")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const authMiddleWare = require("./middlewares/authmiddleware")
const app = express();

dotenv.config();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.DataBaseURI).then(()=>{
    console.log("database has been connected");
}).catch((e)=>{
    console.log("something went wrong while connecting to DB",e);
})


app.use("/blogapp",userRoutes)
app.use("/blogapp",authMiddleWare,postRoutes)
app.use("/blogapp",authMiddleWare,commentRoutes)

app.listen(10000,()=>{
    console.log("Server is up at port 10000");
})
