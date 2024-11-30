const { getUserId } = require("./UserAuth")
const jwt = require("jsonwebtoken")

const UserAuth = (req ,res , next )=>{
    const user = req.headers.authorization

    if(!user){
        return res.status(401).json({message:"Unauthorized"})
    }

    const userId = jwt.verify(user , "HELLO")
    console.log(userId)

   req.userId = userId.userId
   next()  

}

module.exports = {UserAuth}