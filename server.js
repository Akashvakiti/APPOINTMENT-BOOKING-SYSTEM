const exp=require('express')
const app=exp()//express object
const userApp=require('./API/userApi')
const mClient=require('mongodb').MongoClient
var cors = require('cors')

const DBurl="mongodb+srv://spotify:spotify@cluster0.aeb04.mongodb.net/?retryWrites=true&w=majority"
app.use(cors()) // Use this after the variable declaration

//connect react and node.
//__dirname is default path of node(server.js).
const path=require('path')
app.use(exp.static(path.join(__dirname,'./build')))


mClient.connect(DBurl)
.then((client)=>{
    console.log("Connection successful")

    const DbObj=client.db('oneshot')
    //authObj contains all the data which is present in our spotify database
    const authObj=DbObj.collection('oneshot')

    app.set('authObj',authObj)
})
.catch(err=>console.log(`error occured ${err.message}`))


app.use('/',userApp)


//dealing with refresh page
//'*' is to handle other than '/users' 
//and sends same html file whenever we refresh the page.
app.use('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'./build/index.html'))
})

//Invalid requests
app.use((req,res,next)=>{
    res.send({message:`Invalid url ${req.url}`})
})

// Error handling
app.use((err,req,res,next)=>{
    res.send({message:`error occured ${err.message}`})
})

//our backend is running on 3000 port
app.listen(3000,()=>{console.log("Server is listening")})
//const wss = new SocketServer({ app });