const express = require("express")
const {
    loginUser,
    createUser,
    checkUser,
    logoutUser
} = require("../controllers/userController")

const router = express.Router()

// Login route
router.post("/login", loginUser)

// Sign up route
router.post("/signup", createUser)

// Check authentication
router.get("/checkAuth", checkUser)

// Logout route
router.get("/logout", logoutUser)

module.exports = router