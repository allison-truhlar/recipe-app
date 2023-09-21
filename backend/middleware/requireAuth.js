const jwt = require("jsonwebtoken")
// const User = require("../models/userModel")

function requireAuth(req, res, next){

    if(req.session.user){
        next()
    } 
    if(!req.session.user){
        return res.status(401).json({message:"unauthorized"})
    }
}

module.exports = requireAuth