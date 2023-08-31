const notificationCounter =require('../model/notificationCounter')

const createNotificationCounter =async(req,res)=>{
    const {userID}=req.params;
    try{
        const newUser= notificationCounter.create(
            {
                'userID':userID,
                'loaderLength':0,
                'creatorLength':0,
                'difference':0
            }
        )
        return res.status(200).json({message:'notification counter created'});
    }
    catch(err){
        console.log(err)
        return res.status(400).json({err})
        }   
}

const LoadingNotificationCounter =async(req,res)=>{
    const {userID}=req.params;
    try{
         //find user
         const findCounter=await notificationCounter.findOne({userID:userID});
        
         //checking whether there was a match.
          if(!findCounter){
         return res.status(404).json({'message':`no user matches id ${userID}`})
         }

         const difference=findCounter.difference+(findCounter.creatorLength-findCounter.loaderLength)
         const dbResult=await notificationCounter.findByIdAndUpdate(findCounter._id,{
             'loaderLength':findCounter.creatorLength,
             'difference':difference
                 
             },
                 {new:true}
        )
         console.log(dbResult) 
         return res.status(200).json({dbResult}); 
    }
    catch(err){
        console.log(err)
        return res.status(400).json({err})
        }   
}

const UnloadingNotificationCounter =async(req,res)=>{
    const {userID}=req.params;
    try{
         //find user
         const findCounter=await notificationCounter.findOne({userID:userID});
        
         //checking whether there was a match.
          if(!findCounter){
         return res.status(404).json({'message':`no user matches id ${userID}`})
         }

         const dbResult=await notificationCounter.findByIdAndUpdate(findCounter._id,{
             'difference':0    
             },
                 {new:true}
             )
         return res.status(200).json({message:dbResult.difference}); 
    }
    catch(err){
        console.log(err)
        return res.status(400).json({err})
        }   
}



module.exports={
    createNotificationCounter,
    LoadingNotificationCounter,
    UnloadingNotificationCounter
}
