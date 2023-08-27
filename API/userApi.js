const exp=require('express')
const userApp=exp.Router()
const expressAsyncHandler=require('express-async-handler')
const nodemailer = require('nodemailer')

//middle ware to extract object body.
userApp.use(exp.json())

//.....user authentication and it is common for every application.....
const transpoter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: "scoretrack@outlook.com",
        pass: "nithin1239"
    }
})



userApp.post('',expressAsyncHandler(async(req,res)=>{
    //const authObj=req.app.get('authObj')
    //finds user with name 'req.body.username' and returns object
    //let obj=await authObj.findOne({username:req.body.username})
    //console.log(obj.name);

    const min = 100000; // Minimum 6-digit number
    const max = 999999; // Maximum 6-digit number
    const random =Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(random)
    console.log(req.body)
    //otp to mail
    const options={
        from:'scoretrack@outlook.com',
        to:req.body.username,
        subject:"OTP",
        text:`Your One Time Password is ${random}`
    };
    transpoter.sendMail(options,function(err,info){
        if(err){
            console.log(err)
            res.send({"message":`${err.message}`})
        }
        else{
            res.send({message:"OTP sent successfully",otp:`${random}`});
        }
    })
   
}));

module.exports=userApp;