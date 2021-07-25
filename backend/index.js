const express=require('express');
const app=new express();
const path=require('path');
const  apiRouter=require('./src/routes/api')
const adminRouter=require('./src/routes/admin')

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'src/views'));
app.use(express.urlencoded({extended:true}));


app.use('/api',apiRouter);
app.use('/admin',adminRouter)



app.listen(8080,()=>{
	console.log('server running @ 8080');

})
