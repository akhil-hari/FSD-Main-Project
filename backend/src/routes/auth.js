require('dot-env').config();
const jwt=require('express-jwt');
const express=require('express');
const authnRouter= new express.Router();

authRouter.post('/login',(req,res)=>{});


module.exports=authRouter;