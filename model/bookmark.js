const mongoose=require('mongoose')
const Schema=mongoose.Schema

const bookmarksSchema=new Schema({
    post_id:{
        type:String
    },
    bookmarker_id:{
        type:String
    }
})

module.exports=mongoose.model('bookmarks',bookmarksSchema)