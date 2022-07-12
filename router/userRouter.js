const express = require('express') 
const userModel = require('../Models/userModel') 
const router = express.Router() 
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config() 
 
 
 router.get('/',async(req,resp)=>{
        try{
              const users = await userModel.find({})
              resp.status(200).json(users)
        }catch(err){
               resp.status(500).json(err)
        }
 })


 router.get('/:userId',async(req,resp)=> 
 { 
     try{
              const user = await userModel.find({_id: req.params.userId})
              resp.status(200).json(user) 
         
     }catch(err)
     {
              resp.status(500).json(err) 
     } 
     
 })




 router.route('/').post(async(req,resp)=>{ 
     if(!req.body.Email)
     {
              const {Username,Password} = req.body
              try{
                     let Data = await userModel.findOne({Username:Username}) 
                     if(!Data) 
                     {
                          return  resp.status(200).json('User does not exist') 
                     }
                       //Verifies the password the client typed
                     const isMatch = await bcrypt.compare(Password,Data.Password) 
                     if(!isMatch)
                     {
                           return resp.status(200).json('Invalid password')
                     } 
                     const accessToken = jwt.sign(
                            {id:Data._id} ,
                            process.env.ACCESS_SECRET_TOKEN
                        ) 
                     resp.status(200).json({accessToken,Data})

                    
              } catch(err)
              {
                     resp.status(500).json({err:err.message})
              }
     } 

     if(req.body.Fullname)
      {
              const user = new userModel(req.body)
              try{
                     const data = await user.save()
                     resp.status(200).json('Added Successfully')
              }catch(err)
              {
                     resp.status(500).json(data)
              }
      } 
      if(!req.body.Username)
      { 
            try{
                  const user = await  userModel.find({Email:req.body.Email})
                 
                  if(user.length <1)
                  {
                        resp.status(200).json('No matching Email')
                  }
                  else{
                        resp.status(200).json(user) 
                  }
            }catch(err)
            {
                        resp.status(500).json(err)
            }
      }
       
 })  

 

 router.route('/:id').put(async(req,resp)=>
 { 
        
        if(!req.body.Fullname) 
        {
              //Crypt the changed password
              const salt = await bcrypt.genSalt(10)
              const passwordHash = await bcrypt.hash(req.body.Password,salt)
             //Update only the password
             try{  
                     let data = await userModel.updateOne( { _id:req.params.id} , { $set: { Password:passwordHash } })
                     resp.status(200).json('Updated')
            }catch(err)
            {
                     resp.status(500).json('opsss')
            }
       }
       else{
              try{
                     let data = await userModel.findByIdAndUpdate(req.params.id,req.body,{new: true})
                     if(!data)
                     {
                      resp.status(200).json('Something missing')
                     }
                     return resp.status(200).json('Updated')
              }catch(err)
              {
                      resp.status(500).json('Error')
              }
         }
 })  


 module.exports = router