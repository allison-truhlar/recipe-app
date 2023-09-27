const Recipe = require("../models/recipeModel")
const mongoose = require("mongoose")
const cheerio = require("cheerio")
const axios = require("axios")

//function to get all recipes
const getRecipes = async(req, res) =>{
    const recipes = await Recipe.find({user_id: req.user._id}).sort({updatedAt: -1})
    res.status(200).json(recipes)
}

//function to create a new recipe from form input
const createRecipeManual = async(req, res) => {
    const {url, name, recipeIngredient, recipeInstructions} = req.body
    const user_id = req.user._id

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

    addRecipeToDB(url, name, recipeIngredient, recipeInstructions, user_id)
}

//function to create a new recipe from URL
const createRecipeUrl = async(req, res) => {
    const {url} = req.body
    const user_id = req.user._id

    const response = await axios.get(url);
    const html = response.data;

    // Use Cheerio to parse the HTML
    const $ = cheerio.load(html);

    let jsonld;
    const node = $('script[type="application/ld+json"]').get(0);

    try {
        jsonld = JSON.parse(node.firstChild.data);

    } catch (err) {
        // In case of error, you can try to debug by logging the node
        console.log(node);
    }
    const array = jsonld["@graph"]
    const recipeObj = array.filter(obj => obj['@type'] === 'Recipe')[0];
    const name = recipeObj.name
    const recipeIngredient = recipeObj.recipeIngredient
    const recipeInstructionsText = recipeObj.recipeInstructions.map(instruction => instruction.text);

    try{
        const recipe = await Recipe.create({url, name, recipeIngredient, recipeInstructions: recipeInstructionsText, user_id})
        res.status(200).json(recipe)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

//function to add recipe document to DB
const addRecipeToDB = async (url, name, recipeIngredient, recipeInstructions, user_id) =>{
    try{
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
    createRecipeManual,
    createRecipeUrl,
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