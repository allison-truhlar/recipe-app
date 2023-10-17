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
        
        const response = await fetch(`/api/recipes/${id}`, {
            method: "DELETE"
        })
        const json = await response.json()
        
        if(response.ok){
            const updatedRecipes = recipes.filter(recipe => recipe._id !== json.recipe._id)
            dispatch({type: "DELETE_RECIPE", payload: updatedRecipes})
        }
    }

    return(
        <div className="card recipe-card">
            <div className="flex">
                <h4>{recipe.name}</h4>
                <button className="btn btn-outlined icon-btn trash-btn" onClick={()=>handleDeleteClick(recipe._id)}>
                    <span className="material-symbols-outlined">delete</span>
                </button>
            </div>
            <p><strong>Ingredients</strong></p>
            {recipe.recipeIngredient.map((ingredient)=>(
                <p>{ingredient}</p>))}
            <p><strong>Instructions</strong></p>
           {recipe.recipeInstructions.map((instruction)=>(
                <p>{instruction}</p>))}
            {recipe.url && <a href={recipe.url}>Visit the original recipe</a>}
        </div>
    )
}