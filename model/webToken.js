const mongoose=require('mongoose')
const Schema=mongoose.Schema

const webTokensSchema=new Schema({
    userEmail:{
        type:String
    },
    token:{
        type:String
    }
})

module.exports=mongoose.model('webTokens',webTokensSchema)