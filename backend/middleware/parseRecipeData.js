const cheerio = require("cheerio")
const axios = require("axios")

async function parseRecipeData(req, res, next){
    const {url} = req.body

    if(!url){
        return res.status(400).json({error: "Please provide a URL."})
    }

    // Get the HTML document
    const response = await axios.get(url);
    const html = response.data;

    // Use Cheerio to parse the HTML
    const $ = cheerio.load(html);

    let jsonld;
    const node = $('script[type="application/ld+json"]').get(0);

    // Try to read JSON
    try {
        jsonld = JSON.parse(node.firstChild.data);
    } catch (err) {
        return res.status(400).json({error: "Cannot read recipe. Please input recipe details manually."})
    }
    const array = jsonld["@graph"]
    const recipeObj = array.filter(obj => obj['@type'] === 'Recipe')[0];
    // console.log(recipeObj)

    let recipe
    // if the recipeObj exists, attach recipe to the request
    if(recipeObj){
        recipe = {
            url, 
            name: recipeObj.name, 
            recipeIngredient: recipeObj.recipeIngredient,
            recipeInstructions: recipeObj.recipeInstructions.map(instruction => instruction.text)
        }
    } else {
        return res.status(400).json({msg: "Cannot read recipe. Please input recipe details manually."})
    }
    
    req.body = recipe
    req.parsed = true    
    next()
}

module.exports = parseRecipeData