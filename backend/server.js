require("dotenv").config()

const express = require("express")
const cors = require("cors")
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

// Cookie middleware (global)
const sessionStore = MongoStore.create({
    mongoUrl: process.env.MONGO_URI
})
app.use(cookieParser())
app.use(session({
    name: "recipeAppSession",
    cookie: {maxAge: 1000*60*60*24, httpOnly: true},
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore
}))

// Other global middleware
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors({
    origin: 'https://recipe-keeper-app.netlify.app/',
    credentials: true
}))
app.use(function (req, res, next) {	 
    res.setHeader('Access-Control-Allow-Origin', 'https://recipe-keeper-app.netlify.app/');
    res.setHeader('Access-Control-Allow-Credentials', true);    
    next();
});

// Routes
app.use("/api/recipes", recipeRoutes)
app.use("/api/user", userRoutes)

app.listen(port, () => {
    console.log(`app listening on port ${process.env.PORT}`)
})
