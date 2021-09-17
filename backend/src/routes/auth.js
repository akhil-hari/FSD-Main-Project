require('dotenv').config();
const jwt=require('jsonwebtoken');
const express=require('express');
const authRouter= new express.Router();
const {
    auth,
    createAuth,
    verifyToken
}=require('../controller/auth');



authRouter.post('/login',(req,res)=>{
    res.send('<h1>logged In</h1>');




});

authRouter.post('/logout',(req,res)=>{
    res.send('<h1>logged Out</h1>');

})

authRouter.get('/test',async (req,res)=>{
    res.json(await auth('doctor21@believerschurch.com','adminadmin','doctor'));
   
})



module.exports=authRouter;