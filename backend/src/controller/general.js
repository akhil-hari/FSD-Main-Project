const doctorModel= require('../models/doctorData')

async function list_doctors(){
    let data=await doctorModel.find().catch((err)=>{console.log(`${err}:Database Connection Failed while listing doctors.!!`)});
    
    return data;


}
module.exports={
    list_doctors
}