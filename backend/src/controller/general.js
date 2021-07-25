const doctorModel= require('../models/doctorData');
const hospitalModel=require('../models/hospitalData');

async function list_doctors(){
    let data=await doctorModel.find().catch((err)=>{console.log(`${err}:Database Connection Failed while listing doctors.!!`)});
    return data;


}

async function add_hospital(){
    
    
}
module.exports={
    list_doctors
}