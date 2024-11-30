const mongoose = require("mongoose"); // must be installed in project 

const MediaSchema= new mongoose.Schema({
 user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User" 
 },
 title : {
    type : String,
    required : true
 },
 media : {
    type : String,
    required : true
 },
 hashtags:{
   type : String,
    required : true
 },
 discreption :{
    type : String,
    required : true
 }
});


module.exports = mongoose.model( "Medias",MediaSchema)
