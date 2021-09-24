const mongoose= require("mongoose");
require("dotenv").config()

mongoose.connect(process.env.CLOUD_DB_URL,{useNewUrlParser: true,useUnifiedTopology: true}).catch(err=>{console.log(`${err} : Database connection failed.!!`)});

let token= mongoose.Schema({
    token:String
});
let tokenModel=mongoose.model('token',token);
module.exports=tokenModel;