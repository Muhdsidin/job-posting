const bcrypt = require("bcrypt")

const hashPassword = (password )=>{
    const hashed = bcrypt.hash(password , 10)
    return hashed
}

module.exports ={ hashPassword}