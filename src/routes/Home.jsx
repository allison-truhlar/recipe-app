import { useState, useContext, useEffect } from "react";
import RecipeDetails from "../components/RecipeDetails";
import Search from "../components/Search";
import { RecipesContext } from "../context/RecipeContext";
import { getRecipes } from "../api/recipes";

export default function Home() {
  const [ingredient, setIngredient] = useState("");
  const [error, setError] = useState(null);
  const { recipes, dispatch } = useContext(RecipesContext);

  useEffect(() => {
    async function fetchRecipes() {
      const json = await getRecipes();
      dispatch({ type: "SET_RECIPES", payload: json });
    }
    fetchRecipes();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/recipes/search", {
      method: "POST",
      body: JSON.stringify({ ingredient }),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    } else {
      setError(null);
      dispatch({ type: "SET_RECIPES", payload: json });
    }
  };

  const handleClear = async (e) => {
    e.preventDefault();
    setIngredient("");
    setError(null);
    const json = await getRecipes();
    dispatch({ type: "SET_RECIPES", payload: json });
  };

  return (
    <div className="home home-flex display-container">
      <div className="utility-card-container">
        <Search
          ingredient={ingredient}
          setIngredient={setIngredient}
          handleSearch={handleSearch}
          handleClear={handleClear}
          error={error}
        />
      </div>
      <div className="recipe-card-container">
        {recipes
          ? recipes.map((recipe) => (
              <RecipeDetails
                key={recipe.id}
                recipe={recipe}
                canDelete={false}
              />
            ))
          : null}
      </div>
    </div>
  );
}
