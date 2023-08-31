const mongoose=require('mongoose')
const Schema=mongoose.Schema

const likesSchema=new Schema({
    post_id:{
        type:String
    },
    liker_id:{
        type:String
    }
})

module.exports=mongoose.model('likes',likesSchema)