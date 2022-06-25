const mongoose = require('mongoose') 
const {Schema}=mongoose 

const MessageSchema = new Schema({
    conversationId:String,
    sender:String, 
    text:String,
    seen:Boolean
},
 {timestamps:true}
) 
module.exports = mongoose.model('messages',MessageSchema)