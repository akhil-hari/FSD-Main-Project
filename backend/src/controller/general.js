const doctorModel= require('../models/doctorData');
const hospitalModel=require('../models/hospitalData');
const ratingModel=require('../models/ratingData');
const ObjectId=require('mongoose').Types.ObjectId;

async function getDoctor(id){
    let doctor= await doctorModel.findOne({_id:id}).catch((err)=>{console.log(`${err}:Database Connection Failed while listing doctors.!!`)});
    let userRating=await ratingModel.aggregate([
            
        {
            $match:{doctor:ObjectId(id)}
        },
        {
        $group:{
            _id:"$doctor",
            avgRating:{
                $avg:'$rating'
            },
            reviews:{
                $push:{user:'$user',review:'$review',rating:'$rating'}
            }
        }
    }
]).catch(err=>{console.log(`${err}: aggregation failed`)})
//console.log(userRating)    

     let data=await {doctor:doctor,userRatings:userRating[0]};
     
    
    // console.log(data);
    // console.log(doctorId)
    return data;

}

async function list_doctors(){
    
    // A function to retreve a list of doctors 
    let doctors= await doctorModel.find().catch((err)=>{console.log(`${err}:Database Connection Failed while listing doctors.!!`)});
    let data=await doctors.map(async item=>{
        let doctorId=item._id;
        //let review=await ratingModel.find({doctor:doctorId},'review').catch(err=>{review=[]});
        let rating=await ratingModel.aggregate([
            
            {
                $match:{doctor:doctorId}
            },
            {
            $group:{
                _id:"$doctor",
                avgRating:{
                    $avg:'$rating'
                },
                
            }
        }
    ]).catch(err=>{console.log(`${err}: aggregation failed`)})
    // console.log(rating)    

         return {doctor:item,userRatings:rating[0]};
    })
    
    // console.log(data);
    // console.log(doctorId)
    return await Promise.all(data);



}

async function search(query){
    result=doctorModel.find({$or:[{name:{$regex:query}},{currentHospital:{$regex:query}}]}).catch(err=>{console.log(`${err} :Search Failed!`)});
    return Promise.all([result]);
}

async function add_hospital(){
    
    
    
}
async function getHospital(id){
    data=await hospitalModel.findOne({_id:ObjectId(id)}).catch(err=>{console.log(`${err}: can't get from Hospital data`)})
    return Promise.all([data])
}
module.exports={
    list_doctors,getDoctor,getHospital,search
}