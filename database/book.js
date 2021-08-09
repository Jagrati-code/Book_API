const mongoose=require("mongoose");
//Create book schema
const BookSchema=mongoose.Schema({
    ISBN:String,
    title:String,
    authors:[Number],
    language:String,
    pubDate:String,
    numOfPage: NUmber,
    category:[String],
    publications:Number
});
//create book model
const BookModel=mongoose.model(BookSchema);
module.exports=BookModel;