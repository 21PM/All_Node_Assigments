const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    postedById: {
        type:mongoose.Types.ObjectId,
        ref: 'users',
        required:true
    },
    comments:{
        type:[mongoose.Types.ObjectId],
        required:false,
        default:[],
        ref:"comments"
    }
}, {
    timestamps: true
});



const blogModel = mongoose.model("blogs",blogSchema)

module.exports = blogModel