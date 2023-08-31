const notifications =require('../model/notification')
const notificationCounter=require('../model/notificationCounter')
const mongoose=require('mongoose')

const createNotification =async(req,res)=>{
    const {initiator_id,reciever_id}=req.params;
    const {operation,date,post_id}=req.body;
    
    try{
        
        const newUser= notifications.create(
            {
                'initiator_id':initiator_id,
                'reciever_id':reciever_id,
                'operation':operation,
                'date':date,
                'post_id':post_id,
            }
        )

        if(!reciever_id)return res.status(400).json({'message':'reciever id is required'})

        // checkimg whether user provided id is valid
        if(!mongoose.Types.ObjectId.isValid(reciever_id)) return res.status(400).send('invalid id')

        //find user
        const findCounter=await notificationCounter.findOne({userID:reciever_id});
        
        //checking whether there was a match.
         if(!findCounter){
            console.log('creating a new notification counter')
            const newUser= notificationCounter.create(
                {
                    'userID':reciever_id,
                    'loaderLength':0,
                    'creatorLength':1,
                    'difference':0
                }
            )
            return res.status(200).json({message:'notification counter created'});
        }
       else{
        console.log('editin an already existing notification counter')
        const dbResult=await notificationCounter.findByIdAndUpdate(findCounter._id,{
            'creatorLength':findCounter.creatorLength+1
                
            },
                {new:true}
            )
       }
       
        return res.status(200).json({message:'account created'}); 
    }
    catch(err){
        console.log(err)
        return res.status(400).json({err})
        }   
}

const fetchUserNotification = async(req,res)=>{
   
    try{
    const{id}=req.params
    if(!id)return res.status(400).json({'message':'userID is required'})
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).send('invalid id')
    }
    else{
        //find user notification
        const findUser=await notifications.find({reciever_id:id});
        res.status(200).json(findUser)
    }
    }
    catch(err){
        console.log(err)
    }
    
}

const deleteNotification=async(req,res)=>{
    const {notification_id}=req.params;
       try{
            if(!notification_id)return res.status(400).json({'message':'notification id is required'})

        // checkimg whether notification id  provided is valid
        if(!mongoose.Types.ObjectId.isValid(notification_id)) return res.status(400).json({'message':'invalid id'})

        //find notification
        const findNotification=await notifications.findById({_id:notification_id});
        

        //checking whether there was a match.
        if(!findNotification){
            return res.status(404).json({'message':`no Notification matches id ${notification_id}`})
        }

        else{
            //deleting user from database
            await notifications.deleteOne({_id:notification_id});
            res.status(201).json({'message':`notification with ${notification_id} have been deleted`})
        }

        
        }
        catch(err){
            console.log(err)
        }
}



module.exports={
    fetchUserNotification,
    createNotification,
    deleteNotification
}