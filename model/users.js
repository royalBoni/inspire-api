const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const usersSchema= new Schema({
    userEmail:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    userPassword:{
        type:String,
        required:true
    }

})

module.exports=mongoose.model('users', usersSchema);