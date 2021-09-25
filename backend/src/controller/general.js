const doctorModel= require('../models/doctorData');
const hospitalModel=require('../models/hospitalData');
const ratingModel=require('../models/ratingData');
const ObjectId=require('mongoose').Types.ObjectId;
const userSchedule=require('../models/userSchedule');
const { createAuth }=require('../controller/auth');




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
    let data=doctorModel.findOne({_id:id})
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
                $match:{doctor:ObjectId(doctorId)}
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
    // console.log(doctors);
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

    async function searchHospital(query){

    }
    
    return await Promise.all(data);
}

async function searchHospital(query){
    let output;
    let data=hospitalModel.find({name:{$regex:query,$options:'i'}}).then(r=>{output=r;return r==null?false:true}).catch(err=>{return false});
    if(await data){
        return output
    }
    else{
        return [];
    }
    
    
}
async function getHospital(id){
    let output;
    data=hospitalModel.findOne({_id:ObjectId(id)}).then(r=>{output=r ;return r==null?false:true}).catch(err=>{console.log(`${err}: can't get from Hospital data`);return false})
    // console.log(await Promise.all([data]));
    if(await data){
        // console.log(output);
        
        return output;

    }
    else{
        return {type:'err',msg:"can't get  Hospital details"};
    }
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

 async function signUp(item){
     let profile;
     let model;
     if(item.role=='doctor'){
         let input={
            name:item.name, 
            speciality:item.speciality,
            currentHospital:item.currentHospital,
            experience:new Date(item.experience),
            phone:item.phone,
            email:item.email,
            image:item.image,

         }
         model=(doctorModel(input).save()).then(r=>{profile=r._id;return true;}).catch(err=>{return false});
        
     }
     else if (item.role=='user'){
        let input={
            name: item.name,
            age: item.age,
            phone: item.phone,
            sex: item.sex,
            image:item.image
        }
         model=(userModel(input).save()).then(r=>{profile=r._id;return true;}).catch(err=>{return false});

     }

     if(await model){
         if(await createAuth(item.email, item.password,item.role,profile)){
             return {type:'success',msg:'Account Created Successfully'};
        

         }
         else{
             if(item.role=='doctor'){
                 model=doctorModel.findOneAndDelete({_id:profile}).then(r=>{return true}).catch(err=>{return false});
             }
             else if(item.role=='user'){

                model=userModel.findOneAndDelete({_id:profile}).then(r=>{return true}).catch(err=>{return false});

             }
             if(!(await model)){

                console.log(`\nDataBase inconsistency :${item.role}: "${profile}" has been created but failed to create auth!\n`)


             }
             return {type:'err',msg:'Signup failed please try again'};
         }
     }
     else{

        return {type:'err',msg:'Signup failed please try again'};
    }

     }
 
module.exports={

    listDoctors,
    getDoctor,
    getHospital,
    search,
    getDoctorSchedule,
    getUserSchedule,
    getDoctorName,
    getUserName,
    signUp,
    searchHospital
    // upcomingDoctorSchedule

}