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

    
    // item={
    //  name:'abc Hospital',
    // type:'Specialized', 
    // speciality:'Cardio',
    // hospitalDescription:'Blah blah blah..this hospital is such and such .It has such and such facilities available ...',
    // //hospitalRecord:[String],
    // address:{address:'xyz street,def block,ghi area,jkl District ',pin:690567,},
    // contact:'+914792538756',
    // position:{
    //     lon:10.57622,
    //     lat:52.43778
    // }
    // }

    // let  data=hospitalModel(item)
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
