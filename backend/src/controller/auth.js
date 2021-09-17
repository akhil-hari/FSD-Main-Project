require('dotenv').config();
const authData=require('../models/authData');
const userModel=require('../models/userData');
const doctorModel=require('../models/doctorData');

const jwt=require('jsonwebtoken');

async function createAuth(email,password,role,profile){
  let item={

    email:email,
    password:password,
    role:role,
    profile:profile,
    disabled:false,

}
let model=authData(item);
let output;
if(await model.save().then(r=>{output=r;return true}).catch(err=>{return false;})){
    console.log(output);
}

}




async function auth(email,password,role){
//       let data=authData.findOne({ email: email, password: password,role:role}).then();
      let user;
      if(await authData.findOne({ email: email, password: password,role:role}).then(result=>{user=result;return true;},err=>{return false;})){
               
                accessToken=jwt.sign(user.toJSON(),process.env.FIRST_SECRET);
                return {accessToken};
                
      }
}

function verifyToken(req,res,next){
  const authHeader=req.headers['Authorization'];
  const token=authHeader&&authHeader.split(' ')[1];
  if(token==null)return res.sendStatus(401);
  jwt.verify(token,process.env.FIRST_SECRET,(err,user)=>{
    if(err) return res.sendStatus(403);
    req.user=user;
    next();
  })

}

module.exports={
  auth,
  createAuth,
  verifyToken
};
