const User = require("../models/userModel")
const mongoose = require("mongoose")

//login user
async function loginUser(req, res){
    res.json({msg: "login user"})
}

//sign up user
async function createUser(req, res){
    const {email, password} = req.body

    try{
        const user = await User.signup(email, password)
        res.status(200).json({email, user})

    } catch(error) {
        res.status(400).json({error: error.message})

    }
}

module.exports = {
    loginUser,
    createUser
}