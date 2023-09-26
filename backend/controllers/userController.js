const User = require("../models/userModel")
const passport = require("passport");

//login user
async function loginUser(req, res) {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).json({ error: "All fields must be filled" })
    }

    passport.authenticate("local", (err, user, msg) => {
        if (err) {
            return res.status(400).json({error: err})
        }
        if (!user) {
            return res.status(400).json({ error: `Invalid credentials`})
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

// Logout user
async function logoutUser(req, res) {
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
    logoutUser
}





// //Check user
// async function checkAuth(req, res) {
//     if (req.user){
//         return res.status(200).json({ username: req.user.username });
//     }
//     else {
//       return res.status(500).json({ error: "unauthorized" });
//     }
//   }