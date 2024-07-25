const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const commentSchema = new mongoose.Schema({
    postId:{
        type:mongoose.Types.ObjectId,
    },
    comment:{
        type:String,
        required:true,
    },
    postedByUser:{
        type:mongoose.Types.ObjectId,
        required:true,
    },
    parentId:{
        type:String,
        required:true,
    },
    replies:[this]
})
 
const postSchema = new mongoose.Schema({
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

const PostModel = mongoose.model('posts', postSchema);
const commentModel = mongoose.model('comments',commentSchema)

module.exports ={
    PostModel,
    commentModel
} 

