const userSchedule=require('../models/userSchedule')

async function userScheduleStatus(id){
    data = await userSchedule.find({user:id}).sort({timestamp:-1}).catch(err=>{console.log(`cant get from user shecdule due to following error '${err}'`)})


}