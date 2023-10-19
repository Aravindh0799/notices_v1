const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    referenceId:{
        type:String,
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    circularDate:{
        type:String,
        required:true,
    },
    validityDate:{
        type:String,
        required:true,
    },
    staffChecked:{
        type:String,
        required:true,
    },
    studentChecked:{
        type:String,
        required:true,
    },
    dept:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:false,
    },
    readBy:{
        type:String,
        required:false,
        default:""
    }

})
const poster = new mongoose.model('Post',postSchema);
module.exports = poster

