const mongoose = require('mongoose')

console.log("hi")
mongoose.connect('mongodb+srv://Aravindh:Aravindh@cluster0.y3bdjjk.mongodb.net/enotice').then(()=>{
    console.log('DB connection successfully')
}).catch((e)=>{
    console.log('error occured', e)
})