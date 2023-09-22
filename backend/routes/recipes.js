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
