const Recipe = require("../models/recipeModel")
const mongoose = require("mongoose")

//function to get all recipes
const getRecipes = async(req, res) =>{
    const recipes = await Recipe.find({user_id: req.user._id}).sort({updatedAt: -1})
    res.status(200).json(recipes)
}

//function to create a new recipe
const createRecipe = async(req, res) => {
    const {url, name, recipeIngredient, recipeInstructions} = req.body

    let emptyFields = []

    if (!name){
        emptyFields.push("name")
    }
    if (!recipeIngredient){
        emptyFields.push("recipeIngredient")
    }
    if (!recipeInstructions){
        emptyFields.push("recipeInstructions")
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: "Please fill in required fields", emptyFields})
    }

    //add document to db
    try{
        const user_id = req.user._id
        const recipe = await Recipe.create({url, name, recipeIngredient, recipeInstructions, user_id})
        res.status(200).json(recipe)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

//function to delete a recipe
const deleteRecipe = async(req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Recipe not found"})
    }

    const recipe = await Recipe.findOneAndDelete({_id: id})

    if(!recipe){
        return res.status(404).json({error: "Recipe not found"})
    }

    res.status(200).json({recipe})
}

module.exports = {
    getRecipes,
    createRecipe,
    deleteRecipe
}






// //function to get a single recipe
// const getRecipe = async(req,res) =>{
//     const {id} = req.params
//     if(!mongoose.Types.ObjectId.isValid(id)){
//         return res.status(404).json({error: "Recipe not found"})
//     }

//     const recipe = await Recipe.findById(id)

//     if(!recipe){
//         return res.status(404).json({error: "Recipe not found"})
//     }

//     res.status(200).json(recipe)
// }

// //function to update a recipe
// const updateRecipe = async(req, res) => {
//     const {id} = req.params
//     if(!mongoose.Types.ObjectId.isValid(id)){
//         return res.status(404).json({error: "Recipe not found"})
//     }

//     const recipe = await Recipe.findOneAndUpdate({_id: id}, {
//         ...req.body
//     })
//     if(!recipe){
//         return res.status(404).json({error: "Recipe not found"})
//     }
//     res.status(200).json({recipe})

// }