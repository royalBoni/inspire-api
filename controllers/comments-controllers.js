const mongoose=require('mongoose')
const comments =require('../model/comments')

const createComment=async(req,res)=>{
    const {userID, post_id}=req.params;
    const {comment,datetime}=req.body;

    try{
       if(!userID)return res.status(400).json({'message':'user id is required'})
        if(!post_id)return res.status(400).json({'message':'post id is required'})

        const newComment=await comments.create(
            {
                "post_id": post_id,
                "commenter_id":userID,
                "comment":comment,
                "comment_date":datetime
            }
        )
        return res.status(200).json({'message':'successful'}) 

    }
    catch(err){
        console.log(err)
    }
}

const deleteComment=async(req,res)=>{
    const {comment_id,userID}=req.params;
       try{
            if(!comment_id)return res.status(400).json({'message':'comment id is required'})

        // checkimg whether comment id  provided is valid
        if(!mongoose.Types.ObjectId.isValid(comment_id)) return res.status(400).json({'message':'invalid id'})

        //find comment
        const findComment=await comments.findById(comment_id);
        

        //checking whether there was a match.
        if(!findComment){
            return res.status(404).json({'message':`no comment matches id ${comment_id}`})
        }

        else{
            if(findComment.commenter_id===userID){
                //deleting user from database
                await comments.deleteOne({_id:comment_id});
                        
                res.status(201).json({'message':`user with ${comment_id} have been deleted`})
            }
            else{
                return res.status(401).json({'message':`unauthorized to delete`})
            }
        }

        
        }
        catch(err){
            console.log(err)
        }
}

const editComment=async(req,res)=>{
    const {userID,comment_id}=req.params;
    const {comment,datetime}=req.body;
    
    try{
    if(!comment_id)return res.status(400).json({'message':'id is required'})

    // checkimg whether user provided id is valid
    if(!mongoose.Types.ObjectId.isValid(comment_id)) return res.status(400).send('invalid id')

    //find comment
    const findComment=await comments.findById(comment_id);
    
    //checking whether there was a match.
    if(!findComment){
    return res.status(404).json({'message':`no comment matches id ${comment_id}`})
    }
        //update and store the new image
       const dbResult=await comments.findByIdAndUpdate(findComment._id,{
        "comment_id":comment_id,
                "commenter_id":userID,
                "comment":comment,
                "comment_date":datetime
            
        },
            {new:true}
        )
        
        console.log(dbResult)
            
    res.status(201).json({dbResult})
    }
    catch(err){
        console.log(err)
    }

}

const fetchComments=async(req,res)=>{
    try{
        const commentsResults=await comments.find();
        res.status(200).json(commentsResults)
        }
        catch(err){
            console.log(err)
        }
}


module.exports={
    createComment,
    deleteComment,
    editComment,
    fetchComments
}