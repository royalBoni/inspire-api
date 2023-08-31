const mongoose=require('mongoose')
const Schema=mongoose.Schema

const notificationCounterSchema=new Schema({
    userID:{
        type:String
    },
    loaderLength:{
        type:Number
    },
    creatorLength:{
        type:Number
    },
    difference:{
        type:Number
    }
})

module.exports=mongoose.model('notificationCounter',notificationCounterSchema)