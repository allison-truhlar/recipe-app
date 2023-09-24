require("dotenv").config()

const express = require("express")
// const cors = require("cors")
const connectDB = require("./config/db")

// Requirements for authentication
const session = require("express-session")
const MongoStore = require("connect-mongo")
const passport = require("passport")
require("./config/passport")(passport)

// Create express app
const app = express()
const port = process.env.PORT

// Import routers
const recipeRoutes = require("./routes/recipes")
const userRoutes = require("./routes/users")

// Connect to DB
connectDB()

// Body parsing
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// Set up sessions, stored in MongoDB
const sessionStore = MongoStore.create({
    mongoUrl: process.env.MONGO_URI
})

app.use(session({
    name: "recipeAppSession",
    cookie: {maxAge: 1000*60*60*24, httpOnly: true},
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    secure: true
}))

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


// // Other global middleware

// app.use(cors({
//     origin: 'https://recipe-keeper-app.netlify.app',
//     methods: ['POST', 'GET', 'DELETE', 'PATCH'],
//     credentials: true,
//     exposedHeaders: ["set-cookie"]
// }))
// app.use(function (req, res, next) {	 
//     res.setHeader('Access-Control-Allow-Origin', 'https://recipe-keeper-app.netlify.app');
//     res.setHeader('Access-Control-Allow-Credentials', true);    
//     next();
// });

// Routes
app.use("/api/recipes", recipeRoutes)
app.use("/api/user", userRoutes)

// Server running
app.listen(port, () => {
    console.log(`app listening on port ${process.env.PORT}`)
})
