const mongoose= require("mongoose");
const cloudURL='mongodb+srv://admin:adminadmin@fsd-main.fskis.mongodb.net/WebApp?retryWrites=true&w=majority';
const localURL='mongodb://127.0.0.1:27017/WebApp?compressors=zlib&gssapiServiceName=mongodb'




mongoose.connect(cloudURL,{useNewUrlParser: true,useUnifiedTopology: true}).catch(err=>{console.log(`${err} : Database connection failed.!!`)});

ratingSchema=mongoose.Schema({
    doctor:mongoose.Schema.Types.ObjectId,
    user:mongoose.Schema.Types.ObjectId,
    rating:Number,
    review:String,
    created:Date,
    updated:Date
})

ratingModel=mongoose.model('ratingData',ratingSchema);
module.exports=ratingModel;