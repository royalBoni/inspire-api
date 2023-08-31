const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const commentSchema=new Schema({
    post_id:{
        type:String
    },
    commenter_id:{
        type:String
    },
    comment:{
        type:String
    },
    comment_date:{
        type:String
    }
})

module.exports=mongoose.model('comment', commentSchema);