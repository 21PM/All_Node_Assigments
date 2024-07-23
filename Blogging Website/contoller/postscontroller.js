const PostModel = require("../model/postsmodel")
const userModel = require("../model/usermodel")
const addPost = async (req,res)=>{

    const {title,content} = req.body;
    // console.log(req.currentUser);
    if(!title && !content){
        return res.status(400).json({
            status:false,
            message:"Please Give title and write content for your blog"
        })
    }
    if(!title || !content){
        return res.status(400).json({
            status:false,
            message:!title ? "Please Give a title to your content" : "Please write content"
        })
    }
    const currentUserId = req.currentUser._id;

    const postData = {
        title:title,
        content:content,
        postedById:currentUserId
    }

    try{
        const postDetailsSavedInDb =  await PostModel.create(postData)
        const addPostIdInUser = await userModel.findByIdAndUpdate(currentUserId,{$push:{myposts:postDetailsSavedInDb._id}})
        console.log(addPostIdInUser);
    }catch(e){
        console.log(e);
        return res.status(400).json({
            Status:false,
            message:"Unable to upload post",
            error:e
        })
    }


//    console.log(postDetailsSavedInDb);

    res.json({
        message:"Add post APi called"
    })
}

const updatePost = async (req,res)=>{

    const currentUserPosts = req.currentUser.myposts;
    const postId = req.params.postId;
    const isValidUSer = currentUserPosts.includes(postId)

    
    try{
        const IsPostAvailable = await PostModel.findById(postId);
        
    }catch(e){
        return res.status(404).json({
            status:false,
            message:"Given post ID not found"
        })
    }

   if(!isValidUSer){
    return res.status(401).json({
        message:"You are not authorised to update the post only user can update the post"
    })
   }
   const {title,content} = req.body;
   const newData = {
    title,
    content
   }

   try{
   const UpdatedPost =  await PostModel.findByIdAndUpdate(postId,newData,{ new: true, runValidators: true })

   }catch(e){

        return res.json({
            message:'somthing went wrong error',
            error:e
        })
   }

    res.json({
        message:"update post api"
    })
}

const deletePost = async  (req,res)=>{
    
    const postId = req.params.postId;

    try{
        console.log(postId);
        const IsPostAvailable = await PostModel.findById(postId);
        if(!IsPostAvailable){
            return res.status(404).json({
                status:false,
                message:"Given post ID not found"
            })
        }
    }catch(e){
        return res.status(404).json({
            status:false,
            message:"Given post ID not found"
        })
    }

    const currentUserPosts = req.currentUser.myposts;
    const isValidUSer = currentUserPosts.includes(postId);
    
    if(!isValidUSer){
        return res.status(403).json({
            message:"You are not authorised to delete this post only user delete his post"
        })
    }

    try{
        
         await PostModel.findByIdAndDelete(postId)             

        const deleteFromUserData = await userModel.findByIdAndUpdate(req.currentUser._id,{
            $pull:{
            myposts: postId 
             }
            })
    }
    catch(e){
        console.log(e);
        return res.status(403).json({
            error:e,
            message:"unabele to delete"
        })
    }


        return res.json({
            message:"Post has been deleted sucessfully",
            Postid:postId,
            status:isValidUSer
        })
}

const getPosts = async (req,res) =>{

    const allPosts = await PostModel.find({})

   return res.json({
        status:true,
        posts:allPosts
    })
}

const postController = {
    addPost,
    updatePost,
    deletePost,
    getPosts
}

module.exports = postController;