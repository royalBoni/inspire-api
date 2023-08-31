const mongoose=require('mongoose');
const bookmarks=require('../model/bookmark');


// create Bookmark operation
const createBookmark=async(req,res)=>{
    const {bookmarker_id, post_id}=req.params

    try{
        //checking whether bokmark id and post id was parsed from the client
        if(!bookmarker_id)return res.status(400).json({'message':'bookmarker id is required'}) 
        if(!post_id)return res.status(400).json({'message':'post id is required'})

        //creating a new bookmark
        const newBookmark=await bookmarks.create(
            {
                "post_id": post_id,
                "bookmarker_id":bookmarker_id
            }
        )
        return res.sendStatus(200) //status 200 is sent to client when a boomark is created successfuly
    }
    catch(err){
        console.log(err)
    }
}

// deleting a bookmark operation
const deleteBookmark=async(req,res)=>{
    const {post_id,bookmarker_id}=req.params; //destructuring object parsed from client through params

       try{
            // checking whether post id was parsed and if false a status and a prompt is sent to client
            if(!post_id)return res.status(400).json({'message':'bookmark id is required'})

        // checkimg whether comment id  provided is valid
        if(!mongoose.Types.ObjectId.isValid(post_id)) return res.status(400).json({'message':'invalid id'})

        //find comment
        const findBookmark=await bookmarks.findOne({post_id:post_id});
        console.log(bookmarker_id)
        console.log(findBookmark.bookmarker_id)

        //checking whether there was a match.
        //if there no match not found prompt is sent to client
        if(!findBookmark){
            return res.status(404).json({'message':`no bookmark matches id ${post_id}`})
        }

        //if there is a match go ahead and check whether the client is authorised to delete
        else{
            //if authorised
            if(findBookmark.bookmarker_id===bookmarker_id){
                //deleting bookmark from database
                await bookmarks.deleteOne({post_id:post_id});
                        
                res.status(201).json({'message':`bookmark with ${post_id} have been deleted`})
            }

            //else unathorised prompt is sent to the client
            else{
                return res.status(401).json({'message':`unauthorized to delete`})
            } 
            
        }
        
        }
        catch(err){
            console.log(err)
        }
}


// fetching all bookmarks
const fetchBookmark=async(req,res)=>{
    try{
        const bookmarksResults=await bookmarks.find();
        res.status(200).json(bookmarksResults)
        }
        catch(err){
            console.log(err)
        }
}


module.exports={
    createBookmark,
    deleteBookmark,
    fetchBookmark
}