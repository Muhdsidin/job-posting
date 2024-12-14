//this is user controller js file which is used to handle user related operations

/*
 ! Fucntion  = 
    1. CreateProfile
    2. UserLogin
    3. GetAllUserProfile
    4.  GetAllUploadedPost
*/
const UserModel = require("../models/User-model");
const bcrypt = require("bcrypt");
const { HandleError } = require("../utils/Error");
const { signToken } = require("../auth/UserAuth");
const MediaModel = require("../models/Media-model");


const CreateProfile = async (req , res )=>{
    try {
        const { email, password, about, role , skills } = req.body;
        console.log(skills)
        const skillsFromFClient = skills.split(",")
        
        const image = req.body.image;
        const hashPassword = await bcrypt.hash(password, 10);
    
        const user = await UserModel.create({
          // userName : name,
          email: email,
          password: hashPassword,
          profile: image,
          about,
          role,
        });
        user.skills = skillsFromFClient
    
        await user.save();
       
    
       
    
        res.status(200).json({
          message : "Successfully Created Profile "
        });
      } catch (error) {
       
        HandleError(error , res)
      }
}

const UserLogin = async (req , res )=>{
    try {
        const {email , password } = req.body
  
        const user = await UserModel.findOne({email})
        if(!user){
           return res.status(400).json({message:"User not found"})
        }
  
        const checkPassword = await bcrypt.compare(password , user.password)
        if(!checkPassword){
           return res.status(400).json({message:"Wrong password"})
        }
        const token = signToken(user._id, "HELLO");
  
        res.status(200).json(token  )
  
     } catch (error) {
        HandleError(error , res)
     }
}

const getAllUserProfile = async (req , res)=>{
    try {
        const profiles = await UserModel.find()
  
        console.log(profiles)
        res.status(200).json(profiles.reverse())
     } catch (error) {
       HandleError(error , res)
     }
}

const GetAllUploadedPost = async (req , res)=>{
    try {
        const post = await MediaModel.find().populate("user")
        
        console.log(post , "================== get post data  ")
        res.status(200).json(post.reverse() )
  
     } catch (error) {
        HandleError(err , res)
     }
}

const getAUserProfile = async (req , res)=>{
    try {
        const userId = req.userId
        console.log(userId)
        const user = await UserModel.findById(userId)
  console.log(user)
        res.status(200).json(user)
     } catch (error) {
        HandleError(err , res)
     }
  
}


module.exports = {CreateProfile , UserLogin , getAllUserProfile , GetAllUploadedPost , getAUserProfile}