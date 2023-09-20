require("dotenv").config()

const express = require("express")
const connectDB = require("./config/db")

// Requirements for session tracking
const cookieParser = require("cookie-parser")
const session = require("express-session")
const MongoStore = require("connect-mongo")

// Import routers
const recipeRoutes = require("./routes/recipes")
const userRoutes = require("./routes/users")

// Create express app
const app = express()
const port = process.env.PORT

// Connect to DB
connectDB()

// Global middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    })
}))

// Routes
app.use("/api/recipes", recipeRoutes)
app.use("/api/user", userRoutes)

app.listen(port, () => {
    console.log(`app listening on port ${process.env.PORT}`)
})
