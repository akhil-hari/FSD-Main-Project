const express=require('express');
const app=new express();
const path=require('path');
const  apiRouter=require('./src/routes/api')

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'src/views'));
app.use(express.urlencoded({extended:true}));


app.use('/api',apiRouter);



app.listen(8080,()=>{
	console.log('server running @ 8080');

})
