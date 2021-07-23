const mongoose= require("mongoose");
const cloudURL='mongodb+srv://admin:adminadmin@fsd-main.fskis.mongodb.net/WebApp?retryWrites=true&w=majority';
const localURL='mongodb://127.0.0.1:27017/WebApp?compressors=zlib&gssapiServiceName=mongodb'




mongoose.connect(localURL,{useNewUrlParser: true,useUnifiedTopology: true}).catch(err=>{console.log(`${err} : Database connection failed.!!`)});

let hospitalSchema=mongoose.Schema({
    name:String,
    Type:String, 
    speciality:String,
    hospitalDescription:String,
    //hospitalRecord:[String],
    address:String,
    contact:String,
    position:[mongoose.Schema.Types.Mixed]
    


});
let hospitalModel=mongoose.model('hospitalData',hospitalSchema);

module.exports=hospitalModel;
