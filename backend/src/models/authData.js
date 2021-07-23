const mongoose= require("mongoose");
const cloudURL='mongodb+srv://admin:adminadmin@fsd-main.fskis.mongodb.net/WebApp?retryWrites=true&w=majority';
const localURL='mongodb://127.0.0.1:27017/WebApp?compressors=zlib&gssapiServiceName=mongodb'




mongoose.connect(cloudURL,{useNewUrlParser: true,useUnifiedTopology: true}).catch(err=>{console.log(`${err} : Database connection failed.!!`)});

let authSchema=mongoose.Schema({

   email:String,
   password:String,
   role:String,
   profile:mongoose.Types.ObjectId
    
    // timing:[mongoose.Schema.Types.Mixed]
    


});
let doctorModel=mongoose.model('doctorData',doctorSchema);

module.exports=doctorModel;