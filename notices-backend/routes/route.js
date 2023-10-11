const express = require('express')
const router = express.Router()
// const bcrypt  = require('bcrypt')
// const nodemailer = require('nodemailer');
// const jwt = require('jsonwebtoken')
// const otp = require('otp-generator')
// const JWT_SECRET = "ciwbuconciwevccwu1229238c/idb871cb91383hc}28vwrgbw8b748{62[]()69cwv";
const student = require('../schema/students');
const poster = require('../schema/postSchema');
const bcrypt  = require('bcrypt')
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const staff = require('../schema/staff')
const admin = require('../schema/admin')
const upload = multer({ dest: 'uploads/' });

const cloudinary = require('cloudinary');
const { cpuUsage } = require('process');

cloudinary.v2.config({
  cloud_name: 'dyqbmtblx',
  api_key: '688759263514161',
  api_secret: 'Pss4M9UFR4xBtGXgUVk3koNzluQ',
  secure: true,
});





router.post('/register',async(req,res)=>{
    const{name,email,password,resiStatus,dob,dept,year,religion,nationality,address} = req.body;
    const encryptedPassword = await bcrypt.hash(password,10);
    try{
    console.log(req.body,encryptedPassword)

    const otheruser = await student.findOne({email:email})

    if(otheruser){
        return res.json({
            status:409, 
            message:"user already registered"
        })
    }
    else{
    const data = await new student({
        name:name,
        email:email,
        password:encryptedPassword,
        dept:dept,
    }
        
    )

    const result = await data.save()

    if(result){
        res.json({
            message:"success",
            status:200
        })
    }
    else{
        res.json({
            message:"reg failure",
            status:300
        })
    }
    }
}
    catch(e){
        console.log(e)
    }

})


router.post('/login',async(req,res)=>{
    const{email,password}=req.body;

    console.log(req.body)
    try{
        const user = await student.findOne({email:email})
        const staffuser = await staff.findOne({email:email})
        const adminuser = await admin.findOne({email:email})
        // console.log(user,"from try")
        // console.log(staffuser.name,"from try")
        if(user){
            if(await bcrypt.compare(password, user.password)){
                console.log("stud")
                return res.json({
                    status:200,
                    dept:user.dept,
                    message:"stud"
                })
            }
        }
        else if(staffuser){
                console.log("inside staff")
            // if(await bcrypt.compare(password, staff.password)){
                if(password===staffuser.password){
                console.log("staff")
                return res.json({
                    status:200,
                    dept:staffuser.dept,
                    message:"staff"
                })
            }
        }

        else if(adminuser){
            console.log("inside admin")
            if(password===adminuser.password){
                console.log("admin")
                return res.json({
                    status:200,
                    dept:"admin",
                    message:"admin"
                })
        }
    }
            else{
                console.log("error")
                return res.json({
                    status:300
                })
            }
        
        }

    catch(err){
        console.log(err)
    }



})

router.post('/newPost', upload.single('image'),async(req, res) => {
    try {
        // Access the uploaded file via req.file
        // Access other form fields via req.body
        console.log("path",req.file.path)
        console.log(req.body)
        const ref = req.body.referenceId
        const title = req.body.title
        const description = req.body.description
        const validityDate = req.body.validityDate
        const staffChecked = req.body.staffChecked
        const studentChecked = req.body.studentChecked
        const circularDate =req.body.circularDate
        
        console.log("hello")
        const result = await cloudinary.uploader.upload(req.file.path,
            {
                public_id:'notices',
                width:500,
                height:500,
                crop:'fill',
            })
            console.log(result.url)

        try{
            const directory = "/Users/aravindh/Documents/notices/notices_v1/notices-backend/uploads";

            fs.readdir(directory, (err, files) => {
              if (err) throw err;
            
              for (const file of files) {
                fs.unlink(path.join(directory, file), (err) => {
                  if (err) throw err;
                });
              }
            });


        console.log("tempfiles are deleted")
        }
        catch(err){
            console.log("from deletion",err)
        }
        
        if(result.url){

            try{
                const data = await new poster({
                    referenceId:ref,
                    title:title,
                    description:description,
                    validityDate:validityDate,
                    staffChecked:staffChecked,
                    studentChecked:studentChecked,
                    circularDate:circularDate,
                    dept:'MCA',
                    image:result.url
                })
                const result1 = await data.save();
                if(result1){
                    res.json({
                        message: "success",
                        id: result._id,
                    });
                }
                else{
                    res.json({
                        message: "Failure",
                    });
                }

        }
            catch(err){
                console.log("error creation of notice", err);
                // res.status(500).json({
                //     message: "Failure",
                //     error: err.message,
                // });
            }
        }
}
catch(err){
    console.log("error occured in the api", err);
        // res.status(500).json({
        //     message: "Failure",
        //     error: err.message,
        // });
}
})


router.post("/getnotices",async(req,res) =>{
    const{dept,aff} = req.body;
    console.log(aff)
    var notices
    var currdate = new Date()

    var notcArray=[]
    if(aff==='stud'){
        notices = await poster.find({dept:dept,studentChecked:true})
    }
    else{
        notices = await poster.find({dept:dept,staffChecked:true})
    }

    notices.forEach(element => {
        var nd =element.validityDate
        console.log(nd)
        
        currdate.setUTCHours(0,0,0,0)
        console.log(nd)
        console.log(currdate.toDateString())
        if(Date(currdate)>Date(nd)){
            console.log("exp")
        }
        else if(Date(currdate)<=Date(nd)){
            console.log("live")
            notcArray.push(element)
        }

    });

    console.log("live array",notcArray)

    if(notcArray){
        // console.log(notices)
        return res.json(notcArray)
    }
    else{
        return res.json({
            message:"not found"
        })
    }
})

router.post("/getAllNotices",async(req,res) =>{
    const{dept,aff} = req.body;
    console.log(aff)
    var notices

    notices = await poster.find()
    console.log(notices)


    if(notices){
        // console.log(notices)
        return res.json(notices)
    }
    else{
        return res.json({
            message:"not found"
        })
    }
})


router.post("/deletePost",async(req,res)=>{
    const id = req.body.id
    console.log(req.body)
    try{
    const result = await poster.deleteOne({_id:id})
    console.log(result.deletedCount)

    if(result.deletedCount==1){
        return res.json({
            message:"deleted"
        })
    }
    }
    catch(err){
        return res.json({
            message:"notDeleted"
        })
    }


})


module.exports=router
