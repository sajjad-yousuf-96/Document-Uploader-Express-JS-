const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        requried:true,
    },
    image:{
        type:String,
        requried:true,
    }
})
module.exports=mongoose.model('Users',userSchema)