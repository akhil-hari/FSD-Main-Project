const express=require('express');
const cors=require('cors');
const app=new express();
const path=require('path');
const  apiRouter=require('./src/routes/api');
const adminRouter=require('./src/routes/admin');
const authRouter=require('./src/routes/auth');
let port=process.env.PORT||8080;

function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}

app.set('view engine','ejs')
app.use(cors());
// app.use(requireHTTPS);
app.set('views',path.join(__dirname,'src/views'));
app.use(express.static('./dist/frontend'));
// app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.use('/api',apiRouter);
app.use('/admin',adminRouter);
app.use('/auth',authRouter);

app.get('/*',(req,res)=>{
	// res.send('root dir');
 	res.sendFile('index.html', {root: 'dist/frontend/'});
})

 

app.listen(port,()=>{
	console.log(`\x1b[33mserver running @\x1b[0m \x1b[37mPORT:\x1b[0m \x1b[31m${port}\x1b[0m`);

})