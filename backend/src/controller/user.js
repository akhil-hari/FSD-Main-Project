const userSchedule=require('../models/userSchedule');
const doctorSchedule=require('../models/doctorSchedule');
const ratingData=require('../models/ratingData');
const doctorModel=require('../models/doctorData');

async function getDocument(id,model){
    let output;
    
  
    if(await model.findOne({_id:id}).then(e=>{output=e;return true;}).catch()){
        // console.log(output);
        
        // console.log(output);
        return  output;
    }
}

async function userScheduleStatus(id){
    let output;
    if(await userSchedule.find({user:id,schedule:{$gt:new Date()}}).sort({timestamp:-1}).then(async results=>{
        // console.log('re'+results);
       output=await results.map(async result=>{
            
            let data=getDocument(result.doctor,doctorModel);

        if(await data){
            
            
            // console.log(result);

            
            // console.log('re'+result);
            return {schedule:result,doctor:await data};
            }    

        });
        console.log(output);
        
        return true;
        })
        .catch()){
        
        // console.log(output);
        return await Promise.all(output);
    }
    else{
        return {type:'err',msg:'failed to get schedule status'};
    }

    
}


async function doctorAvailable(id){
    let monthlySchedule;
    let weeklySchedule;
    let onetimeSpecial=[]
    let weekly=await doctorSchedule.findOne({doctor:id,type:'weekly'}).sort({_id:-1})
    .then(result=>{
        weeklySchedule=result.schedule;
    })
    .catch(err=>{console.log(`query failed due to:${err}`)});



    let monthly=await doctorSchedule.findOne({doctor:id,type:'monthly'}).sort({_id:-1})
    .then(result=>{
        monthlySchedule=result.schedule;
    }

    )
    .catch(err => {console.log(`query failed due to:${err}`)});

    let onetime=await doctorSchedule.find({doctor:id,type:'onetime','schedule.start':{$gt:new Date()}}).sort({_id:-1})
    .then(result=>{
        result.forEach(e=>{
            onetimeSpecial.push({schedule:e.schedule,mode:0,id:e._id});
        }

        )
        
    })
    .catch(err=>{console.log(`query failed due to:${err}`)});
    console.log(onetimeSpecial);

    if(await Promise.all([weekly,monthly,onetime])){
        return {weekly:weeklySchedule,monthly:monthlySchedule,onetime:onetimeSpecial};
    }

}


async function setUserRating(doctor,user,rating,review){

    let output;

    if(
        await ratingData.findOneAndUpdate({user:user,doctor:doctor},
            {
    
            $setOnInsert:{user:user,doctor:doctor,created:new Date()},
            $currentDate:{updated:Date},
            $set:{review:review,rating:rating}
    
        },
        {upsert:true,new:true}).then(e=>{output=e;return true;}).catch(e=>{return false;})
    ){
        console.log(output);
        return output;
    }
    else{
        return {type:'err',msg:'rating/review not submitted!'};
    }
    
}
async function bookAppointment(doctor,user,schedule){
    let item={
        user:user,
        doctor:doctor,
        schedule:schedule,
        status:'pending',
        timestamp:new Date()
    }

    let data=userSchedule(item);

    if(await data.save().then(result=>{output=result;return true;}).catch()){
        return output;
    }
    else{

        return {type:'err',msg:"Can't place appointment.!"};

    }

}


module.exports={
    userScheduleStatus,
    doctorAvailable,
    setUserRating,
    bookAppointment


}