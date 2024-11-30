const express = require("express");
const { signToken, getUserId } = require("../auth/UserAuth");
const imageUpload = require("../middleware/image-upload");
const UserModel = require("../models/User-model");
const { hashPassword } = require("../utils/bcrypt");
const router = express.Router();
const bcrypt = require("bcrypt");
const { UserAuth } = require("../auth/User");
const MediaModel = require("../models/Media-model");
const JobModel = require("../models/Job-model");

router.post("/create-profile", imageUpload, async (req, res) => {
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
    console.log(user)

    const token = signToken(user._id, "HELLO");

    res.status(200).json(token);
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/login-account" , async (req ,res )=>{
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
      console.log(error.message)
   }
})

router.get("/user-profile",UserAuth, async (req, res) => {
   try {
      const userId = req.userId
      console.log(userId)
      const user = await UserModel.findById(userId)
console.log(user)
      res.status(200).json(user)
   } catch (error) {
      console.log(error.message)
   }
}
)

router.post("/create-post", UserAuth, imageUpload, async (req, res) => {
   try {
      const userId = req.userId
      const image = req.body.image

      const {title , about , hashtags} = req.body
      const upload = await MediaModel.create({
         discreption : about,
         media : image,
         title : title,
         user : userId,
         hashtags
      })
      console.log(upload)

      const user = await UserModel.findById(userId)
      user.media.push(upload)
      await user.save()
      console.log(user)
      res.status(200).json(upload)


   }catch(error){
      console.log(error.message)
   }

})

router.get("/get-post", async (req,res)=>{
   try {
      const post = await MediaModel.find().populate("user").select("-password")
      console.log(post)
      res.status(200).json(post )

   } catch (error) {
      console.log(error.message )
   }
})

router.get("/:email/user-profile",async (req,res)=>{
   try {
    const email = req.params.email
    console.log(email)
      

      const findUser = await UserModel.findOne({email:email})
      console.log(findUser , "=========")
      res.status(200).json(findUser)
   } catch (error) {
      console.log(error.message)
   }
})

router.post("/create-job", UserAuth, async (req, res) => {
   try {
      const userId = req.userId
      const {title , description , location, company } = req.body
      const upload = await JobModel.create({
         title,
         description : description,
         location,
         company,
         user : userId
      })
      console.log(upload)
      const user = await UserModel.findById(userId)
      user.job.push(upload._id)
      await user.save()
      console.log(user)

      res.status(200).json({
         message : " Successfully upload your "
      })
   } catch (error) {
      console.log(error.message )
   }
})


router.get("/get-job", async (req,res)=>{
   try {
      const jobs = await JobModel.find()
      console.log(jobs)
      res.status(200).json(jobs)
   } catch (error) {
      console.log(error.message)
   }
})
module.exports = router;
