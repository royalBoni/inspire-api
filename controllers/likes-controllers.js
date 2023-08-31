const mongoose=require('mongoose');
const likes=require('../model/likes')

const createLike=async(req,res)=>{
    const {liker_id, post_id}=req.params

    try{
        if(!liker_id)return res.status(400).json({'message':'user id is required'})
        if(!post_id)return res.status(400).json({'message':'post id is required'})

        const newLike=await likes.create(
            {
                "post_id": post_id,
                "liker_id":liker_id
            }
        )
        return res.sendStatus(200)
    }
    catch(err){
        console.log(err)
    }
}

const deleteLike=async(req,res)=>{
    const {post_id,liker_id}=req.params;
       try{
            if(!post_id)return res.status(400).json({'message':'like id is required'})

        // checkimg whether comment id  provided is valid
        if(!mongoose.Types.ObjectId.isValid(post_id)) return res.status(400).json({'message':'invalid id'})

        //find comment
        const findLike=await likes.find({post_id:post_id}); 

        //checking whether there was a match.
        if(!findLike){
            return res.status(404).json({'message':`no like matches id ${post_id}`})
        }

        else{
            const specificLike=await findLike.find((item)=>item.liker_id===liker_id)
            if(specificLike){
                //deleting user from database
                await likes.deleteOne({liker_id:specificLike.liker_id});
                        
                return res.status(201).json({'message':`like with ${post_id} have been deleted`})
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

const fetchLikes=async(req,res)=>{
    try{
        const likesResults=await likes.find();
        res.status(200).json(likesResults)
        }
        catch(err){
            console.log(err)
        }
}



module.exports={
    createLike,
    deleteLike,
    fetchLikes
}