const jwt = require("jsonwebtoken") 
const getUserId = (token , SECRET_ID)=>{
    const userId = jwt.verify(token , SECRET_ID)
    return userId
}

const signToken = (userId , SECRET_ID)=>{
    const token = jwt.sign({userId} , SECRET_ID)
    return token
} 




module.exports = {getUserId , signToken}
