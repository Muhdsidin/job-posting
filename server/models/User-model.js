const mongoose = require("mongoose"); // must be installed in project 
const { type } = require("os");

const UserSchema= new mongoose.Schema({
 name : {
    type : String,
    required : true
 },
 email : {
    type : String,
    required : true
 },
 password : {
    type : String,
    required : true
 },
 profile: {
    type: String,
    required: true
 },
 about : {
    type : String,
    required : true
 },
 skills : [],
 role: {
    enum: ["SEEKER", "HIRING_MANAGER"],
    type: String,
 },
 job : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "Jobs"
 }],
 media : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "Medias"
 }],
 cart : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "Jobs"
 }]
 
});


module.exports = mongoose.model( "User",UserSchema)
