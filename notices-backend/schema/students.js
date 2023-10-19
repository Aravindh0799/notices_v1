const mongoose = require('mongoose')

const student = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    rollno:{
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


const students = new mongoose.model('student', student)
module.exports = students