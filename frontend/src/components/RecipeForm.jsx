import { useState, useContext } from "react"
import { RecipesContext } from "../context/RecipeContext"

export default function RecipeForm() {
    const [url, setUrl] = useState("")
    const [name, setName] = useState("")
    const [recipeIngredient, setRecipeIngredient] = useState("")
    const [recipeInstructions, setRecipeInstructions] = useState("")
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const {dispatch} = useContext(RecipesContext)

    function parseTextArea(input){
        //split the input by newline or a semicolon, filter out empty strings
        const parsed = input.split(/[\r\n;]+/).filter(result => result)
        //and then trim off the white spaces
        parsed.forEach(string => string.trim())
        
        if (parsed.length > 0){
            return parsed
        } else {
            return undefined
        }
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()

        const recipe = {
            url, 
            name, 
            recipeIngredient: parseTextArea(recipeIngredient), 
            recipeInstructions: parseTextArea(recipeInstructions)
        }

        const response = await fetch("/api/recipes", {
            method: "POST",
            body: JSON.stringify(recipe),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){
            setUrl("")
            setName("")
            setRecipeIngredient("")
            setRecipeInstructions("")
            setError(null)
            setEmptyFields([])
            dispatch({type: "CREATE_RECIPE", payload: json})
        }
}

    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Recipe</h3>
            
            <label>Recipe Name:</label>
            <input 
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className={emptyFields.includes("name") ? "error" : ""}
            />

            <label>Recipe Ingredients:<br/>
                <span>Separate each ingredient with a semi-colon or return</span>
            </label>
            <textarea 
                onChange={(e) => setRecipeIngredient(e.target.value)}
                value={recipeIngredient}
                className={emptyFields.includes("recipeIngredient") ? "error" : ""}
            />

            <label>Recipe Instructions:<br/>
                <span>Separate each step with a semi-colon or return</span>
            </label>
            <textarea 
                onChange={(e) => setRecipeInstructions(e.target.value)}
                value={recipeInstructions}
                className={emptyFields.includes("recipeInstructions") ? "error" : ""}
            />

            <label>Recipe URL (optional):</label>
            <input 
                type="text"
                onChange={(e) => setUrl(e.target.value)}
                value={url}
            />

            <button>Add recipe</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}