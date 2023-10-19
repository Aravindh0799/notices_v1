const mongoose = require('mongoose')

const admin = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        required:true
    },
    dept:{
        type:String,
        required:true
    }
   
    
})


const admins = new mongoose.model('admin', admin)
module.exports = admins