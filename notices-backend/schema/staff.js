const mongoose = require('mongoose')

const staff = new mongoose.Schema({
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
    },
    
})


const staffs = new mongoose.model('staff', staff)
module.exports = staffs