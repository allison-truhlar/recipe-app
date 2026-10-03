import { useContext } from "react"
import { RecipesContext } from "../context/RecipeContext"

export default function RecipeDetails({ recipe, canDelete }) {
  const { recipes, dispatch } = useContext(RecipesContext)

  async function handleDeleteClick(id) {
    const response = await fetch(`/api/write/${id}`, { method: "DELETE" })
    const json = await response.json()
    if (response.ok) {
      dispatch({ type: "DELETE_RECIPE", payload: recipes.filter((r) => r.id !== json.id) })
    }
  }

  return (
    <div className="card recipe-card">
      <div className="flex">
        <h4>{recipe.name}</h4>
        {canDelete && (
          <button className="btn btn-outlined icon-btn trash-btn" onClick={() => handleDeleteClick(recipe.id)}>
            <span className="material-symbols-outlined">delete</span>
          </button>
        )}
      </div>
      <p><strong>Ingredients</strong></p>
      {recipe.recipeIngredient.map((ingredient, i) => (<p key={i}>{ingredient}</p>))}
      <p><strong>Instructions</strong></p>
      {recipe.recipeInstructions.map((instruction, i) => (<p key={i}>{instruction}</p>))}
      {recipe.url && <a href={recipe.url}>Visit the original recipe</a>}
    </div>
  )
}
