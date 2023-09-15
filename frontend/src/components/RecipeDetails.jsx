import { useContext } from "react"
import { RecipesContext } from "../context/RecipeContext"

export default function RecipeDetails({recipe}){
    const {state, dispatch} = useContext(RecipesContext)

    async function handleClick(id) {
        
        const response = await fetch(`/api/recipes/${id}`, {
            method: "DELETE",
        })
        const json = await response.json()
        
        if(response.ok){
            const updatedRecipes = state.recipes.filter(recipe => recipe._id !== json.recipe._id)
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
            <a href={recipe.url}>Visit the original recipe</a>
            <button className="material-symbols-outlined" onClick={()=>handleClick(recipe._id)}>
                delete
            </button>
        </div>
    )
}