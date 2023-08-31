const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const notificationsSchema= new Schema({
    initiator_id:{
        type:String,
        required:true
    },
    reciever_id:{
        type:String,
        required:true
    },
    operation:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    post_id:{
        type:String
    }
})

module.exports=mongoose.model('notifications', notificationsSchema);