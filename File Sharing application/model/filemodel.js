const mongoose = require("mongoose")

const fileSchema = new mongoose.Schema({
    
    originalName:{
        type:String
    },
    NewFileName:{
        type:String
    },
    Size:{
        type:Number
    }
})

const fileModel = mongoose.model("files",fileSchema)

module.exports = fileModel;