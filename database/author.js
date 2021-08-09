const mongoose=require("mongoose");
//Create author schema
const AuthorSchema=mongoose.Schema({
    id:Number,
       name:String,
       books:[String]
});
//create Author model
const AuthorModel=mongoose.model(AuthorSchema);
module.exports=AuthorModel;