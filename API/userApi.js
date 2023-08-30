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
        user: "project_purpose123@outlook.com",
        pass: "project_purpose"
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
        from:'project_purpose123@outlook.com',
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

userApp.post('/date',expressAsyncHandler(async(req,res)=>{
    const authObj=req.app.get('authObj')
    await authObj.insertOne({"email":req.body.email,"date":req.body.date,"TimeSlot":req.body.timeSlot,"Booked":req.body.Boolean});
    res.send({message:"Slot booked"});
}));

userApp.post('/booked',expressAsyncHandler(async(req,res)=>{
    const authObj=req.app.get('authObj')
    let obj=await authObj.find({date:req.body.date}).toArray();
    console.log(req.body.date);
    let obj1=[];
    obj.map((e)=>{
        return obj1.push(e.TimeSlot);
    })
    console.log(obj)
    console.log(obj1)
    res.send({message:"data retrieved",BookedSlots:`${obj1}`})
}))

userApp.post('/yourslots',expressAsyncHandler(async(req,res)=>{
    const authObj=req.app.get('authObj');
    let obj=await authObj.find({email:req.body.email}).toArray();
    let obj1=[];
    let obj2=[];
    obj.map((e)=>{
        return obj1.push(e.TimeSlot);
    })
    obj.map((e)=>{
        return obj2.push(e.date);
    })
    console.log(obj)
    console.log(obj1)
    console.log(obj2)
    res.send({message:"your slots are displayed",slots:`${obj1}`,dates:`${obj2}`});
}))

userApp.post('/delete',expressAsyncHandler(async(req,res)=>{
    const authObj=req.app.get('authObj');
    const result=await authObj.deleteMany({email:req.body.email,TimeSlot:req.body.slot})
    console.log(result.acknowledged," ",result.deletedCount)
    res.send({message:result.acknowledged});
}))

module.exports=userApp;