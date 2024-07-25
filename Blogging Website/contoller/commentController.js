const {PostModel,commentModel} = require("../model/postsmodel")
const { v4: uuidv4 } = require('uuid');
const userModel = require("../model/usermodel");

const addComment = async (req,res) =>{

    const postId = req.params.postId;
    const {comment} = req.body;
    console.log(req.currentUser._id);
    
    if(!comment || comment === undefined){
        return res.status(403).json({
            status:false,
            message:"Please write your comment"
        })
    }
    try{
        const commentWithParentId = {
            postId:postId,
            comment: comment,
            postedByUser:req.currentUser._id,
            parentId: uuidv4(),
            replies:[]
        };
        const IsPostAvailable = await PostModel.findById(postId)

        if(!IsPostAvailable){
            return res.status(404).json({
                status:false,
                message:'Post Id not found'
            })
        }
        const addedCommentInCollection = await commentModel.create(commentWithParentId)

            const addcommentInPost = await PostModel.findByIdAndUpdate(postId,{$push:{
                comments:addedCommentInCollection._id
            }})
  

    }catch(e){
        console.log(e);
        return res.json({
            message:"unable to add comment Post ID not found",
            error:e
        })
    }

    return res.json({
        message:`comment has been added in post id ${postId}`
    })
}

const getComment = async (req,res)=>{
    
    const postId = req.params.postId;
    console.log(postId);
    try{
        
        const actualPost = await PostModel.findById(postId).populate("comments").select("comments -_id")
        console.log(actualPost);
        if(!actualPost){
            return res.status(404).json({
                status:false,
                message:"Post Id not found"
            })
        }
        // const allComments = actualPost.comments
        return res.json({
            status:true,
            message:`Comments of post Id : ${postId}`,
            comments:actualPost
        })

    }catch(e){
        return res.json({
            message:"unable to get comment, Post ID not found",
            error:e
        })
    }

}

const replyToComment = async (req,res)=>{

    const rootcommentId = req.body.parentId;
    const replyToCommentId = req.params.ToreplycommentId;


    const commentData = {
        replyToComment:req.body.repliedComment,
        parentId:req.body.parentId,
        replies:[]
    }

    const findCommentById = async (AllRootcommentDetails,targetId) => {
        try{
            //  if(AllRootcommentDetails._id == targetId){
            //         return AllRootcommentDetails;
            // }
            // if(AllRootcommentDetails.replies && AllRootcommentDetails.replies.length > 0){
            //     for(const reply of AllRootcommentDetails.replies ){
            //         const found = findCommentById(reply, targetId);
            //         if (found) {
            //             return found; // If found, return the comment
            //         }
            //     }
            // }
            // return false; 

            // if()
            if(AllRootcommentDetails.replies && AllRootcommentDetails.replies.length > 0){
                const checkId = await commentModel.findByIdAndUpdate(targetId)
                console.log(checkId);
            }
            
            

        }
        catch(e){

        }
    };
    
    

    try{
        const AllRootcommentDetails = await commentModel.find({parentId:rootcommentId})

        if(AllRootcommentDetails){
         const found = findCommentById(AllRootcommentDetails[0],replyToCommentId)
            

        }



        if(!AllRootcommentDetails){
            return res.status(404).json({
                status:false,
                message:"Given Root comment  Id not found"
            })
        }
        // console.log(commentDetails);
    }
    catch(e){
        return res.json({
            status:false,
            message:"Incorrect Comment Id"
        })
    }

    return res.json({
        message:"Reply to comment"
    })
}

const updateComment = async (req,res)=>{

    const commentId = req.params.commentId;

    const {comment}  = req.body;
    if(!comment){
        return res.json({
            status:false,
            message:"Please write something in your comment"
        })
    }

    try{
        const updatedComment =  await commentModel.findByIdAndUpdate(commentId,{comment:comment})
        if(!updatedComment){
            return res.status(404).json({
                status:false,
                message:"Give comment Id not found"
            })
        }

    }catch(e){
        return res.status(404).json({
            message:"Unable to modifiy the comment incorrect comment Id",
            error:e
        })
    }

    return res.json({
        message:`Your comment has been udpated for comment id ${commentId}`
    })
}

const deleteComment = async (req,res)=>{

    const commentId = req.params.commentId;
    const user = req.currentUser;
    
    try{
        const commetDetails = await commentModel.findById(commentId);
        // console.log(commetDetails);
        if(!commetDetails){
            return res.json({
                status:false,
                message:"Given Comment Id not found"
            })
        }
        
        if(commetDetails.postedByUser.toString() === user._id.toString()){
            console.log("A");
            await commentModel.findByIdAndDelete(commentId)
          const data  =  await PostModel.findByIdAndUpdate(commetDetails.postId,{
            $pull:{
                comments:commentId
            }
          })

          console.log("data",data);

            return res.json({
                message:"comment did by me has been deleted"
            })
            
        }
        if(user.myposts.includes(commetDetails.postId)){
            console.log("B");

            await commentModel.findByIdAndDelete(commentId)
            const data  =  await PostModel.findByIdAndUpdate(commetDetails.postId,{
                $pull:{
                    comments:commentId
                }
              })
            return res.json({
                message:"Comment from my won post has been deleted"
            })
        }else{
            return res.json({
                error:e,
                message:"You are not authorised to delete this Comment"
            })
        }

    }catch(e){
        return res.json({
            error:e,
            message:"You are not authorised to delete this Comment"
        })
    }
    
    return res.json({
        status:true,
        message:"Delete API has been called"
    })

}

const commentController = {
    addComment,
    getComment,
    updateComment,
    deleteComment
}

module.exports = commentController;