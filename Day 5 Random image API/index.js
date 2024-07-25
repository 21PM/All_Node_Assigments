const express = require("express");
const AllimagesData = require("./imagedata")
const app = express();


const getRandomImage = (req,res)=>{
    const randomNumber = Math.floor(Math.random()*AllimagesData.length);

    return res.status(200).json({
            status:true,
            ImageUrl:AllimagesData[randomNumber].url
    })

}

app.get("/api/image/random",getRandomImage)



app.listen(10000,()=>{
    console.log("Server is up at port no 10000");
})