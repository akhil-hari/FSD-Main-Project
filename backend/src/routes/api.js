const express=require('express');
const doctorModel=require('../models/doctorData');
const apiRouter=new express.Router();


   apiRouter.get('/add_doctor',async (req,res)=>{
     let item= 
      {
      name:'Doctor2', 
      speciality:'ortho',
      currentHospital:'REC',
      hospitalRecord:['VSM','APPOLO'],
      contact:'+919784532845',
      timing:[
         {
            start:{hr:11,min:30},
            end:{hr:14,min:00}
         }
      ]
   }
     let data=doctorModel(item);
      data.save().then(result=>{console.log(`${result} saved`)}).catch((err)=>{console.log(`${err}:Database Connection Failed.!!`)});
   
      res.send('<h1 style="color:cornflowerblue">Item Created</h1>');
  
   });

   apiRouter.get('/list_doctors',async (req,res)=>{
      let data=await doctorModel.find().catch((err)=>{console.log(`${err}:Database Connection Failed.!!`)});
   
      

      


      res.json(data);
  
   });

  
   





 module.exports=apiRouter;