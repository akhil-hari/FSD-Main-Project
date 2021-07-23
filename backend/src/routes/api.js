const express=require('express');
const doctorModel=require('../models/doctorData');
const apiRouter=new express.Router();


   apiRouter.get('/add_doctor',async (req,res)=>{
     let item= 
      {
      name:'Doctor4', 
      speciality:'oncologist',
      currentHospital:'PHC pathiyoor',
      hospitalRecord:['THQH Kayamkulam','APPOLO'],
      contact:'+918567899772'
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
      let data=await doctorModel.find().catch((err)=>{console.log(`${err}:Database Connection Failed.!!`)});
   
   
      

      


      res.json(data);
  
   });

  
   





 module.exports=apiRouter;