const express=require('express');
const doctorModel=require('../models/doctorData');
const userModel=require('../models/userData');
const ratingModel=require('../models/ratingData');

const {
   list_doctors,
   getDoctor,
   getHospital,
   search,
   getDoctorSchedule,
   getUserSchedule,
   upcomingDoctorSchedule
 }=require('../controller/general');

const ObjectId=require('mongoose').Types.ObjectId;
const doctorSchedule=require('../models/doctorSchedule');
const userSchedule=require('../models/userSchedule');


const apiRouter=new express.Router();



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
       res.json(await list_doctors());
  
   });
   apiRouter.get('/search',async (req,res)=>{
      let query=req.query.q;
      res.json(await search(query));
   })
   apiRouter.get('/doctor/:id',async (req,res)=>{
      let doctorId=req.params.id;
      let data=await getDoctor(doctorId);
      res.json(data);
   });
   
   
   apiRouter.get('/hospital/:id',async (req,res)=>{
      let data=await getHospital(req.params.id);
      res.json(data);
   });

   apiRouter.get('/upcoming_schedule/:id',async (req,res)=>{
      let data=await upcomingDoctorSchedule(req.params.id);
      res.json(data);
   })


   apiRouter.get('/add_user',async (req,res)=>{
      let item={
         name: 'User3',
         age: 38,
         phone: '+919573894120',
      }
      let  data=userModel(item)
      await data.save().then(result=>{res.send(`<h1 style="color:cornflowerblue">${result} Created in userdatas</h1>`)}).catch(err=>{res.send(`<h1 style="color:tomato"> ${err} Failed</h1>`)})


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
         schedule:{start:new Date(2021,8,1,13,20),end:new Date(2021,8,1,15,30)},
         timestamp:Date.now()
      }
      let data=doctorSchedule(item)
      await data.save().then(result=>{res.send(`<h1 style="color:cornflowerblue">${result} Created in doctorSchedules</h1>`)}).catch(err=>{res.send(`<h1 style="color:tomato"> ${err} Failed</h1>`)})
   });

   apiRouter.get('/user_schedule',async (req,res)=>{
      let item={
         user:ObjectId('60f19de2dff78773927ffafe'),
         doctor:ObjectId('60f19de2dff78773927ffafe'),
         status:'confirmed',
         schedule:new Date(2021,7,8,16,00),
         //remark:{remark:'Feaver',prescription:'parcetamol IP 1-0-1\npolybione 5ml daily'},
         timestamp:Date.now()
      }
      let data=userSchedule(item)
      await data.save().then(result=>{res.send(`<h1 style="color:cornflowerblue">${result} Created in userSchedules</h1>`)}).catch(err=>{res.send(`<h1 style="color:tomato"> ${err} Failed</h1>`)})
   });   

  
   





 module.exports=apiRouter;
