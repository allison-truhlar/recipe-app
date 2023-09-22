const express = require("express")
const cors = require("cors")

//import controllers
const {
    getRecipes,
    getRecipe,
    createRecipe,
    deleteRecipe,
    updateRecipe
} = require("../controllers/recipeController")

//import middleware
const requireAuth = require("../middleware/requireAuth")

// create router instance
const router = express.Router()

// require middleware
router.use(requireAuth)
router.use(cors({
    credentials: true
}))
app.use(function (req, res, next) {	 
    res.setHeader('Access-Control-Allow-Origin', 'https://master--inquisitive-biscotti-9cbcc6.netlify.app/');
    res.setHeader('Access-Control-Allow-Credentials', true);    
    next();
});

// GET all recipes
router.get("/", getRecipes)

// GET a single recipe
router.get("/:id", getRecipe)

// POST a new recipe
router.post("/", createRecipe)

// DELETE a recipe
router.delete("/:id", deleteRecipe)

// UPDATE a single recipe
router.patch("/:id", updateRecipe)

module.exports = router
