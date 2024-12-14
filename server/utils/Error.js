function HandleError (err , res){
    return res.status(400).json({message : err.message})
}

module.exports = {HandleError}