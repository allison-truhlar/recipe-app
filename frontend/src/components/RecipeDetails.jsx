import { useContext } from "react"
import { RecipesContext } from "../context/RecipeContext"
import { AuthContext } from "../context/AuthContext"

export default function RecipeDetails({recipe}){
    const {recipes, dispatch} = useContext(RecipesContext)
    const {user} = useContext(AuthContext)

    async function handleDeleteClick(id) {
        if(!user){
            return
        }
        
        const response = await fetch(`https://recipe-keeper-ixnb.onrender.com/api/recipes/${id}`, {
            method: "DELETE",
            credentials: "same-origin"
        })
        const json = await response.json()
        
        if(response.ok){
            const updatedRecipes = recipes.filter(recipe => recipe._id !== json.recipe._id)
            dispatch({type: "DELETE_RECIPE", payload: updatedRecipes})
        }
    }

    return(
        <div className="recipe-details">
            <h4>{recipe.name}</h4>
            <p><strong>Ingredients</strong></p>
            {recipe.recipeIngredient.map((ingredient)=>(
                <p>{ingredient}</p>))}
            <p><strong>Instructions</strong></p>
           {recipe.recipeInstructions.map((instruction)=>(
                <p>{instruction}</p>))}
            {recipe.url && <a href={recipe.url}>Visit the original recipe</a>}
            <button className="material-symbols-outlined" onClick={()=>handleDeleteClick(recipe._id)}>
                delete
            </button>
        </div>
    )
}