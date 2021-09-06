const authData=require('../models/authData');
const userModel=require('../models/userData');
const doctorModel=require('../models/doctorData');


async function auth(email,password,role){
//       let data=authData.findOne({ email: email, password: password,role:role}).then();
        let user;
      if(await authData.findOne({ email: email, password: password,role:role}).then(result=>{user=result;return true;},err=>{return false;})){
                if(user.role=='doctor'){
                  let profile=doctorModel.findOne({_id:user.profile});
                        
                }
                else if(user.role=='user'){
                  let profile=userModel.findOne({_id:user.profile});

                }
                else if(user.role=='admin'){
                  
                }
      }
}