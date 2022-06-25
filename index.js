const express = require('express')
const cors = require('cors') 
const emailRouter = require('./router/emailRouter') 
const userRouter = require('./router/userRouter')
const conversationRouter = require('./router/conversationRouter')
const messageRouter = require('./router/messageRouter')
const multer = require("multer")
const path = require("path")


const app = express() 
app.use(cors()) 
app.use(express.json()); 


require('./configs/database')  

//Upload file/images
app.use('/images',express.static(path.join(__dirname,'public/images')))

//Middleware
const storage = multer.diskStorage( {
    destination:(req,file,cb)=>{
        cb(null,"public/images")
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name) 
    }
})

const upload = multer({storage}) 

app.post("/api/upload",upload.single("file"),(req,resp)=>{
    console.log(req.body)
    try{
      return resp.status(200).json(req.file)
    }catch(err){ 
        console.log(err) 
    } 
})

app.use('/api/resetpass',emailRouter) 
app.use('/api/login',userRouter) 
app.use('/api/conversations',conversationRouter) 
app.use('/api/messages',messageRouter)
app.listen(8000) 
