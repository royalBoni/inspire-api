const mongoose=require('mongoose');
const cloudinary=require('../config/cloudinary')
const inspirations=require('../model/inspirations');

const createInspiration=async(req,res)=>{
    /* const {userID}=req.params; */
    const {userID,category,inspiration_title,datetime,author_name,inspiration_content,read_time,fFamily,fStyle,fgColor,bgColor}=req.body;

   try{
        const response={secure_url:'',public_id:''}
        if(!userID)return res.status(400).json({'message':'id is required'})
        if(!mongoose.Types.ObjectId.isValid(userID)) return res.status(400).json({'message':'id is invalid'})
        const result= !req.file? response: await cloudinary.uploader.upload(req.file.path);
        const newInspiration= await inspirations.create(
            {
                'authorID':userID,
                'authorName':author_name,
                'category':category,
                'inspiration_content':inspiration_content,
                'inspiration_title':inspiration_title,
                'inspiration_image_avatar':result.secure_url,
                'inspiration_image_id':result.public_id,
                'datetime':datetime,
                'read_time':read_time,
                'bgColor':bgColor,
                'fgColor':fgColor,
                'fStyle':fStyle,
                'fFamily':fFamily
                
            }
        )
        return res.status(200).json({
            message:'inspiration created',
            inspiration:newInspiration
    });
   }
   catch(err){
       console.log(err)
   }
}


const deleteInspiration=async(req,res)=>{
    const{inspirationID,userID}=req.params;
    if(!inspirationID)return res.status(400).json({'message':'inspiration id is required'})
    if(!userID)return res.status(400).json({'message':'user id is required'})
        try{

        // checkimg whether inspiration provided is valid
        if(!mongoose.Types.ObjectId.isValid(inspirationID)) return res.status(400).json({'message':'invalid id'})

        //find user
        const findInspiration=await inspirations.findById(inspirationID);
        

        //checking whether there was a match.
        if(!findInspiration){
            return res.status(404).json({'message':`no inspiration matches id ${inspirationID}`})
        }

        else{
            if(findInspiration.authorID===userID){
                //delete previous image from image cloud server when there is a mapping from the database
                findInspiration.inspiration_image_id? await cloudinary.uploader.destroy(findInspiration.inspiration_image_id):null;

                //deleting user from database
                await inspirations.deleteOne({_id:inspirationID});
                        
                res.status(201).json({'message':`user with ${inspirationID} have been deleted`})
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

const fetchInspirations=async(req,res)=>{
    try{
        const fetchedResult=await inspirations.find();
        return res.status(200).json(fetchedResult)
    }
    catch(err){
        console.log(err)
    }

}

module.exports={
    createInspiration,
    deleteInspiration,
    fetchInspirations
}