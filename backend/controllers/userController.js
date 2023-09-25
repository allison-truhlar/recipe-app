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
        return res.status(400).json({ error: "All fields must be filled" })
    }

    passport.authenticate("local", (err, user) => {
        if (err) {
            return res.status(400).json({ error: err.message })
        }
        if (!user) {
            return res.status(400).json({ error: "Username does not exist" })
        }
        req.logIn(user, (err) => {
            if (err) {
               return res.status(400).json({ error: err.message })
            }
            return res.status(200).json({ username: user.username })
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
                return res.status(400).json({ error: err.message })
            }
            return res.status(200).json({ username: user.username })
        });

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//Check user
async function checkUser(req, res) {
    try {
      passport.authenticate("local", async (err, user) => {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        if (!user) {
          return res.status(400).json({ error: "Unauthorized" });
        }
  
        await req.logIn(user);
  
        return res.status(200).json({ username: user.username });
      })(req, res);
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

// Logout user
async function logoutUser(req, res) {
    // req.logout(() => {
    //     res.status(200).json({ msg: "logged out" })
    // })
    // console.log(req.user)
    req.session.destroy((err) => {
        res.clearCookie("recipeAppSession")
        if (err){
            return res.status(400).json({ error: err.message })
        }
        return res.status(200).json({msg: "session destroyed"})
    });
}

module.exports = {
    loginUser,
    createUser,
    checkUser,
    logoutUser
}