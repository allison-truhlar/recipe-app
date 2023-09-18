require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const recipeRoutes = require("./routes/recipes")
const userRoutes = require("./routes/users")

// Create express app
const app = express()
const port = 4000

// Middleware
app.use(express.json())
app.use((req,res,next)=>{
    // console.log(req.path, req.method)
    next()
})

// Routes
app.use("/api/recipes", recipeRoutes)
app.use("/api/user", userRoutes)

// Connect to DB
mongoose.connect((process.env.MONGO_URI))
    .then(() => {
        // Listen for requests
        app.listen(process.env.PORT, () => {
            console.log(`connected to db and server listening on port ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })

