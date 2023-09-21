const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")

function createToken(_id){
    return jwt.sign({_id}, process.env.SECRET)
}

//login user
async function loginUser(req, res){
    const {username, password} = req.body

    // Check login credentials
    try{
        const user = await User.login(username, password)
    } catch(error) {
        res.status(400).json({error: error.message})
    }

    // Session data
    req.session.user = {
        username,
        isLoggedIn: true
    }
    // Save session
    try {
        await req.session.save()
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
    res.status(200).json({ username })
}

//sign up user
async function createUser(req, res){
    const {username, password} = req.body
    
    // Try to create a user
    try{
        const user = await User.signup(username, password)
    } catch(error) {
        res.status(400).json({error: error.message})
    }

    // Session data
    req.session.user = {
            username,
            isLoggedIn: true
    }
    // Save session
    try {
        await req.session.save()
    } catch(err){
        res.status(400).json({error: err.message})
    }
    res.status(200).json({username})

}

module.exports = {
    loginUser,
    createUser
}