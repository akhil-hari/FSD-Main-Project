const mongoose= require("mongoose");
const cloudURL='mongodb+srv://admin:adminadmin@fsd-main.fskis.mongodb.net/WebApp?retryWrites=true&w=majority';
const localURL='mongodb://127.0.0.1:27017/WebApp?compressors=zlib&gssapiServiceName=mongodb'




mongoose.connect(cloudURL,{useNewUrlParser: true,useUnifiedTopology: true}).catch(err=>{console.log(`${err} : Database connection failed.!!`)});

let doctorSchema=mongoose.Schema({

    name:String, 
    speciality:String,
    currentHospital:String,
    experience:Date,
    // awards:String,
    phone:String,
    email:String,
    image:String,
    
    // timing:[mongoose.Schema.Types.Mixed]
    


});
let doctorModel=mongoose.model('doctorData',doctorSchema);

module.exports=doctorModel;
