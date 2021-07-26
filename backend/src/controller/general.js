const doctorModel= require('../models/doctorData');
const hospitalModel=require('../models/hospitalData');
const ratingModel=require('../models/ratingData');

async function list_doctors(){
    let doctorId;
    let data;
    await doctorModel.find().then(result=>{doctorId=result[0]._id;data=result}).catch((err)=>{console.log(`${err}:Database Connection Failed while listing doctors.!!`)});
    let rating=await ratingModel.find({doctor:doctorId}).then().catch(err=>{console.log(`${err}:Database Connection`)})
    // console.log(doctorId)
    return {data,rating};


}

async function add_hospital(){
    
    
    
}
module.exports={
    list_doctors
}