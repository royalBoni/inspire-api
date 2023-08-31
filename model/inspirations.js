const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const inspirationsSchema=new Schema({
    authorID:{
        type:String,
        required:true
    },
    authorName:{
        type:String,
    },
    category:{
        type:String
    },
    inspiration_content:{
        type:String
    },
    inspiration_title:{
        type:String
    },
    inspiration_image_avatar:{
        type:String
    },
    inspiration_image_id:{
        type:String
    },
    datetime:{
        type:Date
    },
    read_time:{
        type:Number
    },
    bgColor:{
        type:String
    },
    fgColor:{
        type:String
    },
    fStyle:{
        type:String
    },
    fFamilyColor:{
        type:String
    }

})

module.exports=mongoose.model('inspirations', inspirationsSchema);