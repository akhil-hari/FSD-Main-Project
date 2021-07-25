const express=require('express');
const doctorModel=require('../models/doctorData');
const { list_doctors }=require('../controller/general');
const ObjectId=require('mongoose').Types.ObjectId;


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
       res.json(await list_doctors());
  
   });

  
   





 module.exports=apiRouter;