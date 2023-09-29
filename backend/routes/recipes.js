const express = require("express")

//import controllers
const {
    getRecipes,
    createRecipe,
    searchRecipe,
    deleteRecipe,
} = require("../controllers/recipeController")

//import middleware
const requireAuth = require("../middleware/requireAuth")
const parseRecipeData = require("../middleware/parseRecipeData")

// create router instance
const router = express.Router()

// require requireAuth middleware on all recipe routes
router.use(requireAuth)

//Routes

// GET all recipes
router.get("/", getRecipes)

// POST a new recipe
router.post("/", createRecipe)

// POST a new recipe, using parseRecipeData middleware
router.post("/url", parseRecipeData, createRecipe)

// Search for a recipe by POSTing an ingredient
router.post("/search", searchRecipe)

// DELETE a recipe
router.delete("/:id", deleteRecipe)

module.exports = router










// // GET a single recipe
// router.get("/:id", getRecipe)

// // UPDATE a single recipe
// router.patch("/:id", updateRecipe)