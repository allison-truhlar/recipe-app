const express = require("express")

const {
    loginUser,
    createUser,
    logoutUser
} = require("../controllers/userController")

const requireAuth = require("../middleware/requireAuth")

const router = express.Router()

//Routes

// Login route
router.post("/login", loginUser)

// Sign up route
router.post("/signup", createUser)

// Logout route
router.get("/logout", logoutUser)

// Check authentication route
router.get("/checkAuth", requireAuth, (req, res) => {
    res.status(200).json({username: req.user.username})
})

module.exports = router