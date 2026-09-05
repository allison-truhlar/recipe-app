import { useState, useContext, useEffect } from "react"
import SelectActionForm from "../components/SelectActionForm"
import RecipeDetails from "../components/RecipeDetails"
import RecipeManualForm from "../components/RecipeManualForm"
import RecipeUrlForm from "../components/RecipeUrlForm"
import { RecipesContext } from "../context/RecipeContext"

export default function Manage() {
  const [action, setAction] = useState("view")
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 768)
  const { recipes, dispatch } = useContext(RecipesContext)

  useEffect(() => {
    const handleResize = () => setIsWideScreen(window.innerWidth > 768)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    async function fetchRecipes() {
      const response = await fetch("/api/recipes")
      const json = await response.json()
      if (response.ok) dispatch({ type: "SET_RECIPES", payload: json })
    }
    if (action === "view" || action === "") fetchRecipes()
  }, [action])

  return (
    <div className="home home-flex display-container">
      <div className="utility-card-container">
        <SelectActionForm
          action={action}
          isWideScreen={isWideScreen}
          handleSelect={setAction}
        />
        {action === "addUrl" && <RecipeUrlForm />}
        {action === "addManual" && <RecipeManualForm />}
      </div>
      <div className="recipe-card-container">
        {recipes && recipes.map((recipe) => (
          <RecipeDetails key={recipe.id} recipe={recipe} canDelete={true} />
        ))}
      </div>
    </div>
  )
}
