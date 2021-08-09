const mongoose=require("mongoose");
//Create author schema
const BookSchema=mongoose.Schema({
    ISBN:String,
    title:String,
    authors:[Number],
    language:String,
    pubDate:String,
    numOfPage:Number,
    category:[String],
    publications:Number
});
//create Author model
const BookModel=mongoose.model("books",BookSchema);
module.exports=BookModel;