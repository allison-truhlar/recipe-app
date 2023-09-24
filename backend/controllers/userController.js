const User = require("../models/userModel")
const passport = require("passport");
// const jwt = require("jsonwebtoken")
// const mongoose = require("mongoose")

// function createToken(_id){
//     return jwt.sign({_id}, process.env.SECRET)
// }

//login user
async function loginUser(req, res) {
    const { username, password } = req.body

    if (!username || !password) {
        res.status(400).json({ error: "All fields must be filled" })
    }

    passport.authenticate("local", (err, user) => {
        if (err) {
            res.status(400).json({ error: err.message })
        }
        if (!user) {
            res.status(400).json({ error: "Username does not exist" })
        }
        req.logIn(user, (err) => {
            if (err) {
                res.status(400).json({ error: err.message })
            }
            res.status(200).json({ username: user.username })
        });
    })(req, res);

}

//sign up user
async function createUser(req, res) {
    const { username, password } = req.body

    /// Try to sign up user
    try {
        const user = await User.signup(username, password)

        req.logIn(user, (err) => {
            if (err) {
                res.status(400).json({ error: err.message })
            }
            res.status(200).json({ username: user.username })
        });

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//Check user
function checkUser(req, res) {
    passport.authenticate("local", (err, user) => {
        if (err) {
            res.status(400).json({ error: err.message })
        }
        if (!user) {
            res.status(400).json({ error: "Unauthorized" })
        }
        req.logIn(user, (err) => {
            if (err) {
                res.status(400).json({ error: err.message })
            }
            res.status(200).json({ username: user.username })
        });
    })(req, res);
}

// Logout user
async function logoutUser(req, res) {
    req.logout(() => {
        res.status(200).json({ msg: "logged out" })
    })
    req.session.destroy((err) => {
        if (err)
            res.status(400).json({ error: err.message })
        req.user = null;
        res.redirect("/");
    });
}

module.exports = {
    loginUser,
    createUser,
    checkUser,
    logoutUser
}