const express=require('express');
const adminRouter= new express.Router();
const hospitalModel=require('../models/hospitalData');
const {
    addAdmin,
    addHospital,
    disableAcnt,
    checkAdmin
}= require('../controller/admin');
const {verifyToken}= require('../controller/auth');


adminRouter.get('/add_hospital',async (req,res)=>{

    
    item={
     name:req.body.name,
    type:req.body.type, 
    speciality:req.body.speciality,
    hospitalDescription:req.body.description,
    //hospitalRecord:[String],
    address:req.body.address,
    contact:req.body.phone,
    image:req.body.image
    }

    let  data=addHospital(item)
    return await data;
    // await data.save().then(result=>{res.send(`<h1 style="color:cornflowerblue">${result} Created in hospital Datas</h1>`)}).catch(err=>{res.send(`<h1 style="color:tomato"> ${err} Failed</h1>`)})
});

adminRouter.put('/disable_account',verifyToken,async (req,res)=>{
    if(checkAdmin(req.user)){
        res.json(await disableAcnt(req.body.id,req.body.status));

    }
    else{
        
        res.sendStatus(401);
    }

    
})

adminRouter.post('')

    



module.exports=adminRouter;
