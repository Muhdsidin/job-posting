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
const { CreateProfile, UserLogin, getAllUserProfile, GetAllUploadedPost, getAUserProfile } = require("../controllers/User-Controller");

router.post("/create-profile", imageUpload, CreateProfile);
router.post("/login-account" , UserLogin)
router.get("/get-all-profile", getAllUserProfile)
router.get("/get-post", GetAllUploadedPost)

router.get("/user-profile",UserAuth, getAUserProfile)

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



router.post("/delete-profile",UserAuth ,  async (req, res) => {
   try {
      const userId = req.userId
      const deletedUser = await UserModel.findByIdAndDelete(userId)
      console.log(deletedUser,  " ================")
      if(deletedUser.role === "SEEKER"){
         await MediaModel.deleteMany({user : userId})
      }else{
         await JobModel.deleteMany({user : userId})
      }
      res.status(200).json({
         message : "Successfully Deleted Profile "})
   } catch (error) {
      console.log(error.message)
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
