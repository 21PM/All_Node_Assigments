const mongoose = require('mongoose');


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
        required: true
    }
}, {
    timestamps: true
});

const PostModel = mongoose.model('posts', postSchema);

module.exports = PostModel;
