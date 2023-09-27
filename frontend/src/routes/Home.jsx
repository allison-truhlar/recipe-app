import { useEffect, useContext } from "react"
import { Navigate } from "react-router-dom"
import RecipeDetails from "../components/RecipeDetails"
import RecipeManualForm from "../components/RecipeManualForm"
import RecipeUrlForm from "../components/RecipeUrlForm"
import { RecipesContext } from "../context/RecipeContext"
import { AuthContext } from "../context/AuthContext"

export default function Home() {
    const {recipes, dispatch: recipeDispatch} = useContext(RecipesContext)
    const {user} = useContext(AuthContext)

    useEffect(()=>{
        
        async function fetchRecipes() {
            const response = await fetch("/api/recipes")
            const json = await response.json()

            if(response.ok){
                recipeDispatch({type:"SET_RECIPES", payload: json})
            }
        }

        if(user){
            fetchRecipes()
        }

    }, [user])

    return (
        <>
            {user && (
                <div className="home">
                    <div className="recipes">
                        {recipes && recipes.map((recipe) => (
                            <RecipeDetails
                                key={recipe._id}
                                recipe={recipe}
                            />
                        ))}
                    </div>
                    <div>
                        <RecipeUrlForm/>
                        <RecipeManualForm />
                    </div>
                </div>
            )}
            {!user && <Navigate to={"/login"} />}
        </>
    )
}