const express = require("express")

const {
    loginUser,
    createUser,
    checkAuth,
    logoutUser
} = require("../controllers/userController")

const requireAuth = require("../middleware/requireAuth")

const router = express.Router()

// Login route
router.post("/login", loginUser)

// Sign up route
router.post("/signup", createUser)

// Check authentication
router.get("/checkAuth", requireAuth, (req, res) => {
    res.status(200).json({username: req.user.username})
})

// Logout route
router.get("/logout", logoutUser)

module.exports = router