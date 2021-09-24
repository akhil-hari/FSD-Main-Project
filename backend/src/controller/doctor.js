// const { ObjectId }= require('mongoose')
const doctorSchedule=require('../models/doctorSchedule');
const userSchedule=require('../models/userSchedule');
const userModel=require('../models/userData');
const ObjectId=require('mongoose').Types.ObjectId;


async function getDocument(id,model){
    let output;
    
  
    if(await model.findOne({_id:id}).then(e=>{output=e;return true;}).catch()){
        // console.log(output);
        
        
        return  output;
    }
}

async function setDoctorSchedule(doctor,schedule,type){
    let result;
    let p;

    if(type=='weekly'||type=='monthly'){
        let item={
            doctor:doctor,
            type:type,
            schedule:schedule,
            timestamp: Date.now()
        }
        let model=doctorSchedule(item);
        p=model.save().then(r => {result={type:'success',msg:'Schedule updated successfully'}}).catch(err => {result={type:'err',msg:'Failed to update schedule'}});

    }
    else if(type=='onetime'){
        schedule.forEach(async (e)=>{
            if(e.mode==-1){
                p=doctorSchedule.deleteOne({_id:e.id,type:'onetime'}).then(r => {result={type:'success',msg:'Schedule updated successfully'}}).catch(err => {result={type:'err',msg:'Failed to update schedule'}})
            }
            else if(e.mode==1){
                
                let item={
                    doctor:doctor,
                    type:type,
                    schedule:{start:new Date(e.schedule.start),end:new Date(e.schedule.end)},
                    timestamp: Date.now()

                }
                console.log(item);

                let model=doctorSchedule(item);
                p=model.save().then(r => {result={type:'success',msg:'Schedule updated successfully'}}).catch(err => {result={type:'err',msg:'Failed to update schedule'}});
                
                
                

            }

            

        })}

        if(await Promise.all([p]).then(r=>{return true}).catch(err=>{return false})){
            console.log(result);
            return result;
        }

    }

async function getUpcomingVisits(id){
    let output;
    

    data=userSchedule.find({doctor:id,status:'pending',schedule:{$gt:new Date()}}).then(r=>{output=r;return true;}).catch(err=>{return false})
    // .then(results=>{
       
    //     let x=results.map(async result=>{
            
    //         let user_id=result.user;
    //         let userdata=getDocument(user_id,userModel);
    //         let user;
    //         if(await userdata.then(e=>{user= e;return true;})){

                
           
    //             // console.log({result,user});
    //             // console.logr('rtt'+result);
    //             return {result,user};
                
                

    //         }
            
            
            
    //     });
    //     if(await Promise.all(x)){
    //         // console.log(x);

    //         return await Promise.all(x);
    //     }
        

        
        

    // }).catch(err =>{console.log(`${err}`)});
    // console.log(data);
    
    if(await data){
        
        // console.log(data);
        return output;
       
       
    }
     else{
         return {type:'err',msg:"can't fetch upcoming visits"}
     }
  
    }

    async function getCountOfConfirmed(schedule,id){
        let output
        data=userSchedule.aggregate([{
            $match: {
                doctor: ObjectId(id),
                schedule:new Date(schedule),
                status:'confirmed'
            }
        },
        {$group:{
            _id:'$doctor',
            // schedule:{$addToSet:'$schedule'},
            count:{$sum:1}
        }}
       ]).then(r=>{output=r;console.log(r);return true}).catch(err=>{console.log(err);return false});

        // ,schedule:new Date(schedule),status:'confirmed'
        if(await data){
            return output;


        }
        else{
            

            return {type:'err',msg:"can't get count"}

        }

    }


    async function getPendingVisits(id){
        let output;
        
    
        data=userSchedule.find({doctor:id,status:'pending'}).then(r=>{output=r;return true;}).catch(err=>{return false})
        // .then(results=>{
           
        //     let x=results.map(async result=>{
                
        //         let user_id=result.user;
        //         let userdata=getDocument(user_id,userModel);
        //         let user;
        //         if(await userdata.then(e=>{user= e;return true;})){
    
                    
               
        //             // console.log({result,user});
        //             // console.logr('rtt'+result);
        //             return {result,user};
                    
                    
    
        //         }
                
                
                
        //     });
        //     if(await Promise.all(x)){
        //         // console.log(x);
    
        //         return await Promise.all(x);
        //     }
            
    
            
            
    
        // }).catch(err =>{console.log(`${err}`)});
        // console.log(data);
        
        if(await data){
            
            // console.log(data);
            return output;
           
           
        }
         else{
             return {type:'err',msg:"can't fetch pending visits"}
         }
      
        }
async  function userAppointmentConfirm(id,mode){
    
    let output;
    
    
    if(await userSchedule.findOneAndUpdate({_id:id,status:'pending'},{$set:{status:mode}},{upsert:false,new:true}).then(e=>{output=e;return true;}).catch()){
        
        return output;
    }
    else{
    
        return({type:'err',msg:`failed to ${mode.slice(0,-2)} the appointment;try again!`})
    }

}

    



module.exports={
    setDoctorSchedule,
    getUpcomingVisits,
    userAppointmentConfirm,
    getCountOfConfirmed

}
