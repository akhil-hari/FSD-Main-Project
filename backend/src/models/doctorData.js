const mongoose= require("mongoose");

mongoose.connect('mongodb+srv://admin:adminadmin@fsd-main.fskis.mongodb.net/WebApp?retryWrites=true&w=majority',{useNewUrlParser: true,useUnifiedTopology: true});
let doctorSchema=mongoose.Schema({
    name:String, 
    speciality:String,
    currentHospital:String,
    hospitalRecord:[String],
    contact:String,
    timing:[mongoose.Schema.Types.Mixed]
    


});
let doctorModel=mongoose.model('doctorData',doctorSchema);

module.exports=doctorModel;
