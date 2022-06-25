const router = require('express').Router() 
const Message = require('../Models/massage')   

router.post('/',async (req,resp)=>
{
    const newMessage = new Message(req.body)
    try{ 
        const savedMessage = await newMessage.save()
        resp.status(200).json(savedMessage)
    }catch(err)
    {
        resp.status(500).json(err) 
    }
    
}) 

router.get('/:conversationId',async(req,resp)=>
{
    try{
         const messages = await Message.find({
         conversationId:req.params.conversationId
    }) 
         resp.status(200).json(messages)
    }catch(err)
    {
        resp.status(500).json(err)
    }
}) 

router.put('/:id',async(req,resp)=>{
 try{
    let data = await Message.findByIdAndUpdate(req.params.id,req.body,{new: true})
    if(!data){
        resp.status(200).json('Not updated')
    }
    resp.status(200).json('Updated')
 }catch(err){
      resp.status(500).json('Error')
 }
})

module.exports = router

