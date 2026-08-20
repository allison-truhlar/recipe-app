import { useState, useContext } from "react"
import { RecipesContext } from "../context/RecipeContext"

export default function RecipeManualForm() {
  const [url, setUrl] = useState("")
  const [name, setName] = useState("")
  const [recipeIngredient, setRecipeIngredient] = useState("")
  const [recipeInstructions, setRecipeInstructions] = useState("")
  const [error, setError] = useState(false)
  const [msg, setMsg] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  const { dispatch } = useContext(RecipesContext)

  function parseTextArea(input) {
    const parsed = input.split(/[\r\n;]+/).map((s) => s.trim()).filter(Boolean)
    return parsed.length > 0 ? parsed : undefined
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const recipe = {
      url,
      name,
      recipeIngredient: parseTextArea(recipeIngredient),
      recipeInstructions: parseTextArea(recipeInstructions),
    }
    const response = await fetch("/api/write/recipes", {
      method: "POST",
      body: JSON.stringify(recipe),
      headers: { "Content-Type": "application/json" },
    })
    const json = await response.json()
    setMsg(json.msg || json.error)
    if (!response.ok) {
      setError(true)
      setEmptyFields(json.emptyFields || [])
    } else {
      setUrl(""); setName(""); setRecipeIngredient(""); setRecipeInstructions("")
      setError(false); setEmptyFields([])
      dispatch({ type: "CREATE_RECIPE", payload: json.recipe })
    }
  }

  return (
    <form className="card manual-card" onSubmit={handleSubmit}>
      <h3>Add Recipe Manually</h3>
      <label>Recipe URL (optional):</label>
      <input type="text" onChange={(e) => setUrl(e.target.value)} value={url} />
      <label>Recipe Name:</label>
      <input type="text" onChange={(e) => setName(e.target.value)} value={name}
        className={emptyFields.includes("name") ? "error" : ""} />
      <label>Recipe Ingredients:<br /><span>Separate each ingredient with a semi-colon or return</span></label>
      <textarea onChange={(e) => setRecipeIngredient(e.target.value)} value={recipeIngredient}
        className={emptyFields.includes("recipeIngredient") ? "error" : ""} />
      <label>Recipe Instructions:<br /><span>Separate each step with a semi-colon or return</span></label>
      <textarea onChange={(e) => setRecipeInstructions(e.target.value)} value={recipeInstructions}
        className={emptyFields.includes("recipeInstructions") ? "error" : ""} />
      <button className="btn submit-btn">Add recipe</button>
      <div className={`${error ? "error" : ""} msg`}>{msg}</div>
    </form>
  )
}
