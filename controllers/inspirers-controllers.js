const mongoose=require('mongoose');
const inspirers=require('../model/inspirers');

const createInspirer=async(req,res)=>{
    const {fan_id, inspirer_id}=req.params

        try{
            if(!fan_id)return res.status(400).json({'message':'fan id is required'})
            if(!inspirer_id)return res.status(400).json({'message':'inspirer id is required'})

            const newInspirer=await inspirers.create(
                {
                    "inspirer_id": inspirer_id,
                    "fan_id":fan_id
                }
            )
            return res.sendStatus(200)
        }
        catch(err){
            console.log(err)
        }
}

const deleteInspirer=async(req,res)=>{
    const {follow_id,fan_id}=req.params;
       try{
            if(!follow_id)return res.status(400).json({'message':'follow id is required'})

        // checkimg whether comment id  provided is valid
        if(!mongoose.Types.ObjectId.isValid(follow_id)) return res.status(400).json({'message':'invalid id'})

        //find comment
        const findFollow=await inspirers.findById(follow_id);
        

        //checking whether there was a match.
        if(!findFollow){
            return res.status(404).json({'message':`no follow matches id ${follow_id}`})
        }

        else{
            if(findFollow.fan_id===fan_id){
                //deleting user from database
                await inspirers.deleteOne({_id:follow_id});
                        
                res.status(201).json({'message':`follow with ${follow_id} have been deleted`})
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

const fetchInspirers=async(req,res)=>{
    try{
        const inspirersResults=await inspirers.find();
        res.status(200).json(inspirersResults)
        }
        catch(err){
            console.log(err)
        }
}

module.exports={
    createInspirer,
    deleteInspirer,
    fetchInspirers
}