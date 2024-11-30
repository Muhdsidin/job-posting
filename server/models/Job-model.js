const mongoose = require("mongoose"); // must be installed in project 

const JobSchema = new mongoose.Schema({
 user: {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User"
 },
 title : {
   type : String,
   required : true
 },
 description :{
   type : String,
   required : true
 },
 location :{
   type : String,
   required : true
 },
 company :{
   type : String,
   required : true
 }

});


module.exports = mongoose.model( "Jobs",JobSchema)
