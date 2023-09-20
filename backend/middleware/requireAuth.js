const jwt = require("jsonwebtoken")
// const User = require("../models/userModel")

function requireAuth(req, res, next){

    const token = req.cookies.token

    if(!token){
        return res.status(401).json({message:"uauthorized"})
    }
    try{
        const decoded = jwt.verify(token, process.env.SECRET)
        req._id = decoded._id
        next()
    } catch(error){
        res.status(401).json({message: "unauthorized"})
    }
}

module.exports = requireAuth