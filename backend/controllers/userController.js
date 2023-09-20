const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")

function createToken(_id){
    return jwt.sign({_id}, process.env.SECRET)
}

//login user
async function loginUser(req, res){
    const {email, password} = req.body

    try{
        const user = await User.login(email, password)

        //create token
        const token = createToken(user._id)
        res.cookie("token", token, {httpOnly: true})
        res.status(200).json({msg:"successfully logged in"})

    } catch(error) {
        res.status(400).json({error: error.message})

    }
}

//sign up user
async function createUser(req, res){
    const {email, password} = req.body

    try{
        const user = await User.signup(email, password)

        //create token
        const token = createToken(user._id)
        res.cookie("token", token, {httpOnly: true})

        res.status(200).json({user})

    } catch(error) {
        res.status(400).json({error: error.message})

    }
}

module.exports = {
    loginUser,
    createUser
}