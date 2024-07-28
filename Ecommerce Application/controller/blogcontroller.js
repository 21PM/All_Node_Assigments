const blogModel = require("../model/blogmodel")
const userModel = require("../model/usermodel")

const addBlog = async(req,res)=>{

    const {title,content} = req.body;

    if(!title || !content){
        return res.json({
            message:"Please provide title and content to add your blog"
        })
    }
    const blogData = {
        title:title,
        content:content,
        postedById:req.currentUser._id
    }

    try{
        const saveBlog = await blogModel.create(blogData) 
        console.log(saveBlog);
        if(!saveBlog){
            return res.json({
                message:"Error while uploading your blog"
            })
        }

        const updateBlogInUser = await userModel.findByIdAndUpdate(req.currentUser._id,{
            $push:{
                blogs:saveBlog._id
            }
        })

        return res.json({
            message:"You blog has been uploaded"
        })

    }catch(e){
        return res.json({
            message:"Unable to upload your blog ,Something went wrong",
            error:e
        })
    }
}


const deleteBlog = async (req,res)=>{

    const blogId = req.params.blogId;

    if(!blogId)
    return res.json({
        message:"Please provide blog ID"
    })

    try{
        const isBlogAvailable = await blogModel.findById(blogId)
        if(!isBlogAvailable){
            return res.json({
                message:"Provided blog ID is incorrect"
            })
        }
        const isValidUser =  await userModel.findById(req.currentUser._id)
        if(!(isValidUser.blogs.includes(blogId))){
            return res.json({
                message:"You are not authorised to delete this blog"
            })
        }

        const deleteblog = await blogModel.findByIdAndDelete(blogId)
        const removeBLogFromUser = await userModel.findByIdAndUpdate(req.currentUser._id,{
            $pull:{
                blogs:blogId
            }
        })
        
        return res.json({
            message:"Your Blog has been deleted"
        })
    }catch(e){
            return res.status(404).json({
                message:"Unable to delete the blog, Something went wrong",
                error:e
            })
    }


}


const updateBlog = async (req,res)=>{

    const blogId = req.params.blogId;
    

    if(!blogId){
        return res.json({
            message:"Please provide a blog ID"
        })
    }
    try{
        const isValidUser = await userModel.findById(req.currentUser._id)

        if(!(isValidUser.blogs.includes(blogId))){
            return res.json({
                message:"You are not authorised to update this blog"
            })
        }

        const isBlogAvailable = await blogModel.findByIdAndUpdate(blogId,req.body,{new:true,runValidators:true})
            console.log(isBlogAvailable);
        
        return res.json({
            message:"You blog has been udpated"
        })

    }catch(e){
        return res.json({
            message:"Error while updating the blog"
        })
    }
     
}



const blogControllers = {
    addBlog,
    deleteBlog,
    updateBlog  
}

module.exports = blogControllers

