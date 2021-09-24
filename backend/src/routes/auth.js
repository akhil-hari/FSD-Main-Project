require('dotenv').config();
const jwt=require('jsonwebtoken');
const express=require('express');
const authRouter= new express.Router();
const {
    auth,
    createAuth,
    verifyToken,
    generateToken,
    isDisabled
}=require('../controller/auth');



authRouter.post('/login',async (req,res)=>{
    console.log(req.headers.authorization);
    
    let output;
    // console.log(req.body);
    if(await auth(req.body.email,req.body.password,req.body.role).then(r=>{output=r;return r.hasOwnProperty('type')&&r.type=='status'})){
            
        res.sendStatus(output.code);
    }
    else{
        
        res.json(output);
    }

});

authRouter.post('/refresh',async (req,res)=>{
    let output;
    if(await generateToken(req.body.token).then(r=>{output=r;return r.hasOwnProperty('type')&&r.type=='status'})){
        res.sendStatus(output.code);
    }
    else{
        res.json(output);
    }  

});

authRouter.get('/is_disabled',async (req,res)=>{
    res.json(await isDisabled(req.query.profile));
})

authRouter.delete('/logout',async (req,res)=>{
    res.send('<h1>logged Out</h1>');

})

authRouter.get('/test',async (req,res)=>{
    // res.json(await auth('doctor21@believerschurch.com','adminadmin','doctor'));
    
   
})



module.exports=authRouter;