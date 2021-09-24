require('dotenv').config();
const authData=require('../models/authData');
const ObjectId=require('mongoose').Types.ObjectId;
// const userModel=require('../models/userData');
// const doctorModel=require('../models/doctorData');
const refreshTokenModel=require('../models/refreshToken');

const jwt=require('jsonwebtoken');

async function createAuth(email,password,role,profile){
  let item={

    email:email,
    password:password,
    role:role,
    profile:profile||'none',
    disabled:false,

}
let model=authData(item);

if(await model.save().then(r=>{return true}).catch(err=>{return false;})){
    return true;
}
else {
  return false;
}

}

async function generateToken(token){
  let storedToken;
  let data=refreshTokenModel.findOneAndDelete({token:token});
  if(await data.then(r=>{storedToken=r;return true}).catch(err=>{return false})){
    let u;
      if(!storedToken){
        console.log(`unauthorised use of token:${token} detected`); 
        return {type:'status',code:401}
      }
    let output=jwt.verify(token,process.env.REFRESH_SECRET,async (err,user)=>{
      if(err){
        console.log(`unauthorised use of token:${token} detected`); 
        return {type:'status',code:401}
      }
     
      u=user.user;

      accessToken=jwt.sign({user:u},process.env.FIRST_SECRET,{expiresIn:'20m'});
      refreshToken=jwt.sign({user:u},process.env.REFRESH_SECRET);
      let item={token:refreshToken};
      let model=refreshTokenModel(item);
      if(await model.save().then(r=>{return r==null?false:true}).catch(err=>{return false})){
                  console.log(`new tokens generated,token:${token} revoked`);
                  return {accessToken,refreshToken,profile:u.profile,role:u.role};
            }
           else{
                  
                  return {type:'status',code:503};
                }
                
    })
  

    
    return output;

  }
  else{
    
    return {type:'status',code:503};
  }
}




async function auth(email,password,role){
//       let data=authData.findOne({ email: email, password: password,role:role}).then();
      let user;
      let err;
      if(await authData.findOne({ email: email, password: password,role:role}).then(r=>{user=r;if(r==null)err={type:'status',code:401}; return r==null?false:true;},error=>{err={type:'err',msg:'login failed'};return false;})){
               
                accessToken=jwt.sign({user:user.toJSON()},process.env.FIRST_SECRET,{expiresIn:'20m'});
                refreshToken=jwt.sign({user:user.toJSON()},process.env.REFRESH_SECRET);
                let item={token:refreshToken};
                let model=refreshTokenModel(item);
                if(await model.save().then(r=>{return r==null?false:true}).catch(err=>{return false})){
                  return {accessToken,refreshToken,profile:user.profile,role:user.role};
                }
                else{
                  
                  return {type:'err',msg:'login failed'};
                }
                
                
      }
      else{

        return err;
        
      }
}

function verifyToken(req,res,next){
  const authHeader=req.headers['authorization'];
  console.log(authHeader);
  const token=authHeader&&authHeader.split(' ')[1];
  if(token==null)return res.sendStatus(401);
  jwt.verify(token,process.env.FIRST_SECRET,(err,user)=>{
    if(err) return res.sendStatus(403);
    req.user=user.user;
    next();
  })

}

async function isDisabled(profile){
  let output;
  console.log(profile)
  let model=authData.findOne({profile:ObjectId(profile)}).then(r=>{output=r;return r==null?false:true}).catch(err=>{return false});
  if (await model){
    
    return {profile:profile,disabled:output.disabled}
  }
  else{
    return {type:'err',msg:"can't get disabled status"};
  }

}

module.exports={
  auth,
  createAuth,
  verifyToken,
  generateToken,
  isDisabled
};
