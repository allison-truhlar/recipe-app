import { useState, useContext } from "react"
import { Navigate } from "react-router-dom"
import RecipeDetails from "../components/RecipeDetails"
import RecipeManualForm from "../components/RecipeManualForm"
import RecipeUrlForm from "../components/RecipeUrlForm"
import Search from "../components/Search"
import { RecipesContext } from "../context/RecipeContext"
import { AuthContext } from "../context/AuthContext"

export default function Home() {
    const [ingredient, setIngredient] = useState("")
    const [error, setError] = useState(null)
    const {recipes, dispatch: recipeDispatch} = useContext(RecipesContext)
    const {user} = useContext(AuthContext)

    // useEffect(()=>{
        
    //     async function fetchRecipes() {
    //         const response = await fetch("/api/recipes")
    //         const json = await response.json()

    //         if(response.ok){
    //             recipeDispatch({type:"SET_RECIPES", payload: json})
    //         }
    //     }

    //     if(user){
    //         fetchRecipes()
    //     }

    // }, [user])

    const handleSearch = async (e) =>{
        e.preventDefault()

        if (!user) {
            setError("You must be logged in")
            return
        }

        const response = await fetch("/api/recipes/search", {
            method: "POST",
            body: JSON.stringify({ ingredient }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const json = await response.json()
        console.log(response)

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            setIngredient("")
            setError(null)
            recipeDispatch({type:"SET_RECIPES", payload: json})
        }


    }

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
                        <Search
                            ingredient={ingredient}
                            setIngredient={setIngredient} 
                            handleSearch={handleSearch} 
                            error={error}
                        />
                        <RecipeUrlForm/>
                        <RecipeManualForm />
                    </div>
                </div>
            )}
            {!user && <Navigate to={"/login"} />}
        </>
    )
}