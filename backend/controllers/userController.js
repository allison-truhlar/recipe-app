const User = require("../models/userModel")
const mongoose = require("mongoose")

//login user
async function loginUser(req, res){
    res.json({msg: "login user"})
}

//sign up user
async function createUser(req, res){
    res.json({msg: "sign-up user"})
}

module.exports = {
    loginUser,
    createUser
}