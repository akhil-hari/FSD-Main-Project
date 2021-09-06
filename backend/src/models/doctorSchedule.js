const mongoose= require("mongoose");
const cloudURL='mongodb+srv://admin:adminadmin@fsd-main.fskis.mongodb.net/WebApp?retryWrites=true&w=majority';
const localURL='mongodb://127.0.0.1:27017/WebApp?compressors=zlib&gssapiServiceName=mongodb'




mongoose.connect(cloudURL,{useNewUrlParser: true,useUnifiedTopology: true}).catch(err=>{console.log(`${err} : Database connection failed.!!`)});

let doctorSchedule=mongoose.Schema({
        doctor:mongoose.Schema.Types.ObjectId,
        type:String,
        schedule:mongoose.Schema.Types.Mixed,
        timestamp:Date

});

dScheduleModel=mongoose.model('doctorSchedule',doctorSchedule);
module.exports=dScheduleModel;