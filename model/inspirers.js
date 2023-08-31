const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const inspirersSchema=new Schema({
    fan_id:{
        type:String
    },
    inspirer_id:{
        type:String
    }
})

module.exports=mongoose.model('inspirers',inspirersSchema)