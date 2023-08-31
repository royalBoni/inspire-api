const mongoose=require('mongoose');
const profile=require('../model/profiles');
const cloudinary =require('../config/cloudinary');



const createProfile=async(req,res)=>{
    const response={secure_url:'',public_id:''}
    try{
        const {userID,userEmail,userName}=req.body;
        
         if(!userID)return res.status(400).json({'message':'id is required'})
         if(!mongoose.Types.ObjectId.isValid(userID)) return res.status(400).send('invalid id')
        const findProfile =await profile.find({userID:userID});
        if(findProfile.length===0){
            const newProfile= profile.create(
                {
                    'userID':userID,
                    'userName':userName,
                    'profileName':'Inspirer',
                    'dateCreated':new Date(),
                    'dateOfBirth':'',
                    'work':JSON.stringify({company:'',position:''}),
                    'education':JSON.stringify({program:'',level:'',institute:''}),
                    'phoneNumber':'',
                    'country':'',
                    'bio':'',
                    'email':userEmail
                }
            )
            return res.sendStatus(200);
        }
        else{
            return res.status(401).json({message:'profile already created'});
        } 
    }
    catch(err){
        console.log(err)
    }
}


const editProfile=async(req,res)=>{
    const {userID,userName,profileName,dateOfBirth,work,education,phoneNumber,country,bio}=req.body;
    
    try{
    if(!userID)return res.status(400).json({'message':'id is required'})

    // checkimg whether user provided id is valid
    if(!mongoose.Types.ObjectId.isValid(userID)) return res.status(400).send('invalid id')

    //find user
    const findProf=await profile.find({userID:userID});
    const findProfile = findProf.find((item)=>item.userID===userID)
    
    //checking whether there was a match.
    if(!findProfile){
    return res.status(404).json({'message':`no user matches id ${userID}`})
    }

    const response={secure_url:findProfile.profile_image_avatar,public_id:findProfile.profile_image_id}

    //delete previous image from image cloud server
    req.file? (findProfile.profile_image_id? await cloudinary.uploader.destroy(findProfile.profile_image_id):null):null;
    
    //uploading the updated image to the cloud server
    const result= !req.file? response: await cloudinary.uploader.upload(req.file.path);
        //update and store the new image
       const dbResult=await profile.findByIdAndUpdate(findProfile._id,{
        'userID':userID,
        'userName':userName,
        'profileName':profileName,
        'profile_image_avatar':result.secure_url,
        'profile_image_id':result.public_id,
        'dateOfBirth':dateOfBirth,
        'work':work,
        'education':education,
        'phoneNumber':phoneNumber,
        'country':country,
        'bio':bio,
            
        },
            {new:true}
        )
            
    res.status(201).json({dbResult})
    }
    catch(err){
        console.log(err)
    }

}

const fetchProfile=async(req,res)=>{
    const fetchedResult=await profile.find();
    return res.status(200).json(fetchedResult)
}

module.exports={
    createProfile,
    editProfile,
    fetchProfile
}