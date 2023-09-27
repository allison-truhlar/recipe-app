const express = require("express")

//import controllers
const {
    getRecipes,
    createRecipeManual,
    createRecipeUrl,
    deleteRecipe,
} = require("../controllers/recipeController")

//import middleware
const requireAuth = require("../middleware/requireAuth")

// create router instance
const router = express.Router()

// require middleware
router.use(requireAuth)

//Routes

// GET all recipes
router.get("/", getRecipes)

// POST a new recipe from form input
router.post("/manual", createRecipeManual)

// POST a new recipe from form input
router.post("/url", createRecipeUrl)

// DELETE a recipe
router.delete("/:id", deleteRecipe)

module.exports = router










// // GET a single recipe
// router.get("/:id", getRecipe)

// // UPDATE a single recipe
// router.patch("/:id", updateRecipe)