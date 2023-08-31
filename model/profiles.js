const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const profilesSchema= new Schema({
    userID:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    profileName:{
        type:String
    },
    profile_image_avatar:{
        type:String
    },
    profile_image_id:{
        type:String
    },
    dateCreated:{
        type:Date
    },
    dateOfBirth:{
        type:Date
    },
    education:{
        type:Object
    },
    work:{
        type:Object
    },
    phoneNumber:{
        type:String
    },
    country:{
        type:String
    },
    bio:{
        type:String
    },
    email:{
        type:String
    }


})

module.exports=mongoose.model('profiles', profilesSchema);