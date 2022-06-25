const mongoose = require('mongoose') 
const {Schema}=mongoose 

const ConversationSchema = new Schema({
    members:[String]
},
 {timestamps:true}
) 
module.exports = mongoose.model('conversations',ConversationSchema)