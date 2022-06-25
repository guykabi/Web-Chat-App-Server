require('dotenv').config() 
const router = require('express').Router() 
const Conversation = require('../Models/conversation') 
const Message = require('../Models/massage')
const jwt = require('jsonwebtoken')


router.post('/',async(req,resp)=>
{
        const newConversation = new Conversation({
        members : [req.body.senderId,req.body.recieverId],
    })
    try{
        const saveConversation = await newConversation.save()
        resp.status(200).json('added!')
    }catch(err)
    {
        resp.status(500).json(err)
    }
})   

router.get('/:userId',async(req,resp)=>
{ 
    const token = req.headers['x-access-token']
        if (!token) {
            return resp.status(401).json('No Token Provided');
          }
    
      jwt.verify(token,  process.env.ACCESS_SECRET_TOKEN,async (err, data)  => {
        if (err) {
          return resp.status(500).json('Failed to authenticate token');
        }
        else{
              try{
                    const conversation = await Conversation.find({
                    members : { $in :[req.params.userId]}
             })
                    resp.status(200).json(conversation)
             }catch(err)
                {
                    resp.status(500).json(err)
               }
          }
     })
})


router.delete('/:id',async(req,resp)=>{
    const id = req.params.id 
    try{
    let data = await Conversation.findByIdAndDelete(id)
    let data2 = await Message.deleteMany({conversationId:id})
    if(data && data2){
        resp.status(200).json("Deleted")
    }else{
        resp.status(200).json('Something wrong')
    }
       
    }catch(err)
    {
        resp.status(500).json("Error")
    }
})

module.exports = router
