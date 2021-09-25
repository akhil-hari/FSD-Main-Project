const express=require('express');
const doctorModel=require('../models/doctorData');
const userModel=require('../models/userData');
const ratingModel=require('../models/ratingData');

const { 
   userScheduleStatus,
   doctorAvailable,
   setUserRating,
   bookAppointment
 }= require('../controller/user')

 const {
    setDoctorSchedule,
    getUpcomingVisits,
    userAppointmentConfirm,
    getCountOfConfirmed,
    getVisitsToday

 }= require('../controller/doctor');


const {
   listDoctors,
    getDoctor,
    getHospital,
    search,
    getDoctorSchedule,
    getUserSchedule,
    getDoctorName,
    getUserName,
    searchHospital,
    signUp
 }=require('../controller/general');

const ObjectId=require('mongoose').Types.ObjectId;
const doctorSchedule=require('../models/doctorSchedule');
const userSchedule=require('../models/userSchedule');


const apiRouter=new express.Router();
   

   apiRouter.post('/signup',async (req,res)=>{
      
      let data=signUp(req.body.data);
      res.json(await data);
   })



   apiRouter.get('/add_doctor',async (req,res)=>{
     let item= 
      {
      name:'Doctor1', 
      speciality:'oncologist',
      currentHospital:'hospital3',
      experience:'10 years',
      phone:'+918546798924',
      email:'doctor1@hospital3.com'
      // timing:[
      //    {
      //       start:{hr:11,min:30},
      //       end:{hr:14,min:00}
      //    }
      // ]
   }
     let data=doctorModel(item);
      data.save().then(result=>{console.log(`${result} saved`)}).catch((err)=>{console.log(`${err}:Database Connection Failed.!!`)});
   // let model=doctorModel()
   // console.log(model.schema.obj);
   
      res.send('<h1 style="color:cornflowerblue">Item Created</h1>');
  
   });

   apiRouter.get('/list_doctors',async (req,res)=>{
         console.log('apiRouter')
         //console.log(await getDoctor('60f19de2dff78773927ffafe'))
       res.json(await listDoctors());
  
   });
   apiRouter.get('/search',async (req,res)=>{
      let query=req.query.q;

      res.json(await search(query));
   });
   apiRouter.get('/search_hospital',async (req,res)=>{
      let query=req.query.q;

      res.json(await searchHospital(query));
   });

   apiRouter.get('/u',async (req,res)=>{

      let id=req.query.id;
      res.json(await getUserName(id));

   });

   apiRouter.get('/d',async (req,res)=>{

      let id=req.query.id;
      res.json(await getDoctorName(id));

   });


   apiRouter.get('/doctor/:id',async (req,res)=>{
      let doctorId=req.params.id;
      let data=await getDoctor(doctorId);
      
      res.json(data);
   });
   
   
   apiRouter.get('/h',async (req,res)=>{
      // console.log(req.query.id);
      
      let data=getHospital(req.query.id);

      res.json(await data);
   });

   apiRouter.get('/upcoming_visits',async (req,res)=>{
      let data=await getUpcomingVisits(req.query.id);
      res.json(data);
   });

   apiRouter.get('/doctor_available',async (req,res)=>{
      let id=req.query.id;
      data=await doctorAvailable(id);
      res.json(data);
   });


  

   apiRouter.get('/add_rating',async (req,res)=>{
      item={
         doctor:ObjectId('60f19de2dff78773927ffafe'),
         user:ObjectId('60fd787dc8f84f2f5af9ade3'),
         rating:1,
         review:'blah baolg blah not good service....',
         created:Date.now(),
         Updated:Date.now()
      }
      let  data=ratingModel(item)
      await data.save().then(result=>{res.send(`<h1 style="color:cornflowerblue">${result} Created in ratingdatas</h1>`)}).catch(err=>{res.send(`<h1 style="color:tomato"> ${err} Failed</h1>`)})

   });

  
   apiRouter.get('/doctor_schedule',async (req,res)=>{
      let item={
         doctor:ObjectId('60f19de2dff78773927ffafe'),
         type:'onetime',
         // schedule:{start:new Date(2021,8,1,13,20),end:new Date(2021,8,1,15,30)},
            schedule:{
               start:new Date(2021,8,7,17,30),
               end:new Date(2021,8,7,18,30)
            
            },
         timestamp:Date.now()
      }
      let data=doctorSchedule(item)
      await data.save().then(result=>{res.send(`<h1 style="color:cornflowerblue">${result} Created in doctorSchedules</h1>`)}).catch(err=>{res.send(`<h1 style="color:tomato"> ${err} Failed</h1>`)})
   });

apiRouter.get('/schedule_status',async (req,res)=>{
   id=req.query.id;
   let data=userScheduleStatus(id);
   res.json(await data);

});

apiRouter.post('/set_schedule',async (req,res)=>{
   let doctor=req.body.doctor;
   let type=req.body.type;
   let schedule=req.body.schedule;
   let data=setDoctorSchedule(doctor,schedule,type);
 
   res.json(await data);
   
});

apiRouter.post('/confirm_appointment',async (req,res)=>{
   let id=req.body.id;
   // console.log(req.headers);
   let mode=req.body.mode;
   data=await userAppointmentConfirm(id,mode);
      res.json(data);

});

apiRouter.post('/book_appointment',async (req,res)=>{
   let doctor=req.body.doctor;
   let user=req.body.user;
   let schedule=req.body.schedule;

   data=await bookAppointment(doctor,user,schedule);
      res.json(data);


});

apiRouter.post('/set_userrating',async (req,res)=>{
   let doctor=req.body.doctor;
   let user=req.body.user;
   let rating=req.body.rating;
   let review=req.body.review;

   data=await setUserRating(doctor,user,rating,review);
   res.json(data);

});

apiRouter.get('/confirmed_count',async (req,res)=>{
   let schedule=req.query.schedule

   let id=req.query.id;
   console.log(id)
      let data=getCountOfConfirmed(schedule,id);
      // console.log({schedule:schedule,count:(await data)[0].count,doc_id:(await data)[0]._id});
      
      res.json({schedule:schedule,count:((await data)[0]&&(await data)[0].count),doc_id:((await data)[0]&&(await data)[0]._id)});
})

apiRouter.get('/visits_today',async (req,res)=>{
   let data=getVisitsToday(req.query.id);
   res.json(await data);
})

apiRouter.get('/user_schedule',async (req,res)=>{
      let item={
         user:ObjectId('60fd781e81ab452f060c00f0'),
         doctor:ObjectId('60f19de2dff78773927ffafe'),
         status:'pending',
         schedule:new Date(2021,11,9,17,30),
         //remark:{remark:'Feaver',prescription:'parcetamol IP 1-0-1\npolybione 5ml daily'},
         timestamp:Date.now()
      }
      let data=userSchedule(item)
      await data.save().then(result=>{res.send(`<h1 style="color:cornflowerblue">${result} Created in userSchedules</h1>`)}).catch(err=>{res.send(`<h1 style="color:tomato"> ${err} Failed</h1>`)})
   }); 
   apiRouter.get('/test',async (req,res)=>{
      
      let data=getVisitsToday('60f19de2dff78773927ffafe');
      res.json(await data);
      
   });

  
   





 module.exports=apiRouter;
