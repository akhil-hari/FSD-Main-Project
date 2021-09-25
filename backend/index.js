const express=require('express');
const cors=require('cors');
const app=new express();
const path=require('path');
const  apiRouter=require('./src/routes/api');
const adminRouter=require('./src/routes/admin');
const authRouter=require('./src/routes/auth');
let port=8080;

app.set('view engine','ejs')
app.use(cors());
app.set('views',path.join(__dirname,'src/views'));
// app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.use('/api',apiRouter);
app.use('/admin',adminRouter);
app.use('/auth',authRouter);

app.get('/*',(req,res)=>{
	res.send('root dir');
})

 

app.listen(port,()=>{
	console.log(`\x1b[33mserver running @\x1b[0m \x1b[37mPORT:\x1b[0m \x1b[31m${port}\x1b[0m`);

})
