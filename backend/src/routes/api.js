const express=require('express');
const doctorModel=require('../models/doctorData');
const userModel=require('../models/userData');
const ratingModel=require('../models/ratingData');
const { list_doctors,getDoctor,getHospital }=require('../controller/general');
const ObjectId=require('mongoose').Types.ObjectId;
const doctorSchedule=require('../models/doctorSchedule');
const userSchedule=require('../models/userSchedule');


const apiRouter=new express.Router();



   apiRouter.get('/add_doctor',async (req,res)=>{
     let item= 
      {
      name:'Doctor5', 
      speciality:'oncologist',
      currentHospital:new ObjectId('60fd2299dff20e3837410371'),
      hospitalRecord:['THQH Mavelikara','APPOLO'],
      contact:'+918546798924'
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
   apiRouter.get('/doctor/:id',async (req,res)=>{
      let doctorId=req.params.id;
      let data=await getDoctor(doctorId);
      res.json(data);
   });
   
   
   apiRouter.get('/hospital/:id',async (req,res)=>{
      let data=await getHospital(req.params.id);
      res.json(data[0]);
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

   })

  
   apiRouter.get('/doctor_Schedule',async (req,res)=>{
      let item={
         doctor:ObjectId('60f19de2dff78773927ffafe'),
         type:'Pediatrician',
         schedule:['Date','Time'],
         timestamp:Date.now()
      }
      let data=doctorSchedule(item)
      await data.save().then(result=>{res.send(`<h1 style="color:cornflowerblue">${result} Created in doctorSchedules</h1>`)}).catch(err=>{res.send(`<h1 style="color:tomato"> ${err} Failed</h1>`)})
   });

   apiRouter.get('/user_Schedule',async (req,res)=>{
      let item={
         user:ObjectId(''),
         doctor:ObjectId(''),
         status:'Available',
         schedule:Date.now(),
         remark:['Good doctor','medical history'],
         timestamp:Date.now()
      }
      let data=userSchedule(item)
      await data.save().then(result=>{res.send(`<h1 style="color:cornflowerblue">${result} Created in userSchedules</h1>`)}).catch(err=>{res.send(`<h1 style="color:tomato"> ${err} Failed</h1>`)})
   });   

   async function getdoctorSchedule(id){
      data=await doctorSchedule.findOne({_id:ObjectId(id)}).catch(err=>{console.log(`${err}: can't get from doctorSchedule data`)})
      return Promise.all([data])
   }

   async function getuserSchedule(id){
   data=await userSchedule.findOne({_id:ObjectId(id)}).catch(err=>{console.log(`${err}: can't get from userSchedule data`)})
   return Promise.all([data])
   }

   module.exports={
     getdoctorSchedule,getuserSchedule
   }
   





 module.exports=apiRouter;
