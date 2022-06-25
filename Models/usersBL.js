const UserModel = require('./userModel') 


const checkUser = (username,password)=>
{
    return new Promise((resolve,reject)=>
    { 
        UserModel.find({Username:username,Password:password},function(err,data)
        { 
            
            if(err)
            {
                reject(err)
            } 
            else{
                if(data.length <1)
                {
                    resolve("User does not exist")
                } 
                else{ 
                 resolve(data)
                }
            }

        })
    })
}   


const addUser = (newUser)=>
{
    return new Promise((resolve,reject)=>
    {
        const user = new UserModel(newUser)
        user.save(err=>
         {
           if(err)
           {
             reject(err)
           } 
           resolve('Added Successfully')
         })
    })
} 

const getUser = (email) =>
{
   return new Promise((resolve,reject)=>{
       UserModel.find({Email:email},function(err,data)
       {
           if(err)
           {
               reject(err)
           }  
           else
           {
                  if(data.length<1)
                  {
                      resolve('No matching Email')
                  } 
                  else
                  {
                    resolve(data[0]._id)
                  }
            }
           
       })
   })
}  


const updatePassword = (id,password)=>
{
  return new Promise((resolve,reject)=>
  {
      UserModel.updateOne( { _id:id} , { $set: { Password :password } },function(err,data)
      {
          if(err)
          {
              reject(err)
          } 
          resolve('Updated')
      })
  })
}

module.exports = {checkUser,addUser,getUser,updatePassword}