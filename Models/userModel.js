const mongoose = require('mongoose') 
const {Schema} = mongoose 
const {hash} = require('bcryptjs')
const bcrypt = require('bcryptjs/dist/bcrypt')

const UserSchema = new Schema({
    
    Fullname: String, 
    Email:String, 
    Username:String, 
    Password:String ,
    Image:String,
    background:String
})  

//Crypt the new user password
UserSchema.pre('save',async function (){
    if(this.isModified('Password')){
        this.Password = await bcrypt.hash(this.Password,12)
        
    }
})


module.exports = mongoose.model('users',UserSchema)