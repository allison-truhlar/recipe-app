const express = require("express")
const {
    loginUser,
    createUser
} = require("../controllers/userController")

const router = express.Router()

// Login route
router.post("/login", loginUser)

// Sign up route
router.post("/signup", createUser)

module.exports = router