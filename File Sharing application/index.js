const epxress = require("express");
const multer  = require('multer')
const FileRoutes = require("./routes/fileroute")
const userRoutes = require("./routes/userroutes")
const app =  epxress();
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

mongoose.connect(process.env.Database_URI)
.then(()=>{
    console.log("DB connected sucessfully");
})
.catch((e)=>{
    console.log("DB Not connected",e);
})

app.use(epxress.json())

app.use(userRoutes)

app.use(FileRoutes)

app.listen(10000,()=>{
    console.log("Server is up at port no 10000");
})