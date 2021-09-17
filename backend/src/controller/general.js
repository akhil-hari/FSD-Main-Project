const doctorModel= require('../models/doctorData');
const hospitalModel=require('../models/hospitalData');
const ratingModel=require('../models/ratingData');
const ObjectId=require('mongoose').Types.ObjectId;
const userSchedule=require('../models/userSchedule');





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
            count:{$sum:1},
            reviews:{
                $push:{user:'$user',review:'$review',rating:'$rating',updated:'$updated'}
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
async function getUserName(id){
    let data=userModel.findOne({_id:id})
    let output;
    if(await data.then(r=>{output=r;return true}).catch(err=>{return false})){
        return output;
    }
    else{
        return {type:'err',msg:'Unknown Error'}
    }

}

async function getDoctorName(id){
    let data=userModel.findOne({_id:id})
    let output;
    if(await data.then(r=>{output=r;return true}).catch(err=>{return false})){
        return output;
    }
    else{
        return {type:'err',msg:'Unknown Error'}
    }

}

async function listDoctors(){
    
    // A function to retreve a list of doctors 
    let doctors= await doctorModel.find().catch((err)=>{console.log(`${err}:Database Connection Failed while listing doctors.!!`)});
    console.log(doctors);
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
                count:{$sum:1}
                
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
    let doctors=await doctorModel.find({$or:[{name:{$regex:query,$options:'i'}},{currentHospital:{$regex:query,$options:'i'}}]}).catch(err=>{console.log(`${err} :Search Failed!`)});
    console.log(doctors);
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
                count:{$sum:1}
                
            }
        }
    ]).catch(err=>{console.log(`${err}: aggregation failed`)})
    // console.log(rating)    

         return {doctor:item,userRatings:rating[0]||{}};
    })
    
    return await Promise.all(data);
}

async function add_hospital(){
    
    
    
}
async function getHospital(id){
    data=await hospitalModel.findOne({_id:ObjectId(id)}).catch(err=>{console.log(`${err}: can't get from Hospital data`)})
    // console.log(await Promise.all([data]));
    return (await Promise.all([data]))[0];
}
async function getDoctorSchedule(doctor_id,user_id){
    data=await doctorSchedule.findOne({doctor:ObjectId(doctor_id),user:ObjectId(user_id)}).catch(err=>{console.log(`${err}: can't get from doctorSchedule data`)})
    return await Promise.all([data])
 }
 async function upcomingDoctorSchedule(doctor_id){
     data=await userSchedule.find({doctor:doctor_id,schedule:{$gt:new Date()},status:{$in:['confirmed','pending']}}).catch(err=>{console.log(`${err}: can't get upcoming schedules`)});
     return await Promise.all([data]);
 }

 async function getUserSchedule(doctor_id,user_id){
    data=await userSchedule.find({doctor:ObjectId(doctor_id),user:ObjectId(user_id)}).catch(err=>{console.log(`${err}: can't get from userSchedule data`)})
    return await Promise.all([data])
 }
module.exports={

    listDoctors,
    getDoctor,
    getHospital,
    search,
    getDoctorSchedule,
    getUserSchedule,
    getDoctorName,
    getUserName
    // upcomingDoctorSchedule

}