const hospitalModel=require('../models/hospitalData');
const authData=require('../models/authData');

const {createAuth}=require('../controller/auth');
const ObjectId=require('mongoose').Types.ObjectId;

async function addHospital(item){
    let model=hospitalModel(item).save().then(r=>{return true}).catch(err=>{return false});
    if(await model){
        return {type:'success',msg:'Hospital added to the DataBase'};
    }
    else{
        return {type:'err',msg:"Couldn't add hospital  to the DataBase"};
    }
}

async function disableAcnt(id,status){
    let model=authData.findOneAndUpdate({profile:ObjectId(id)},{$set:{disabled:status}},{upsert:false,new:true});
    if(await model){
        return {type:'success',msg:`Account ${status?'Disable':'Enable'}d`};
    }
    else{
        return {type:'err',msg:`Couldn't ${status?'Disable':'Enable'} Account`};
    }


}

async function addAdmin(email,password){
    return (await createAuth(email,password,'admin',null));

}
async function checkAdmin(user){

    if(user.role=='admin'){
        return true;
    }
    else{
        return false;
    }
    

}
module.exports={
    addAdmin,
    addHospital,
    disableAcnt,
    checkAdmin
}