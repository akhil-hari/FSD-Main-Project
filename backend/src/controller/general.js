const doctorModel= require('../models/doctorData');
const hospitalModel=require('../models/hospitalData');
const ratingModel=require('../models/ratingData');

async function list_doctors(){
    
    // let data=[];
    let doctors= await doctorModel.find().catch((err)=>{console.log(`${err}:Database Connection Failed while listing doctors.!!`)});
    let data=await doctors.map(async item=>{
        let doctorId=item._id;
        let rating=await ratingModel.find({doctor:doctorId}).catch(err=>{rating=[]});
         return {item,rating};
    })
    
    // console.log(data);
    // console.log(doctorId)
    return await Promise.all(data);



}

async function add_hospital(){
    
    
    
}
module.exports={
    list_doctors
}