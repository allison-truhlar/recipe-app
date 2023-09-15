const mongoose = require("mongoose")
const Schema = mongoose.Schema

const recipeSchema = new Schema({
    url:{
        type: String
    },
    name: {
        type: String,
        required: true
    },
    recipeIngredient: {
        type: [String],
        required: true,
        default: undefined
    },
    recipeInstructions: {
        type: [String],
        required: true,
        default: undefined
    }
}, {timestamps: true})

module.exports = mongoose.model("Recipe", recipeSchema)