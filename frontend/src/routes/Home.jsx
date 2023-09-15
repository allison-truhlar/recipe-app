import { useEffect, useContext } from "react"
import RecipeDetails from "../components/RecipeDetails"
import RecipeForm from "../components/RecipeForm"
import { RecipesContext } from "../context/RecipeContext"

export default function Home() {
    const {state, dispatch} = useContext(RecipesContext)

    useEffect(()=>{
        async function fetchRecipes() {
            const response = await fetch("/api/recipes")
            // console.log(response)
            const json = await response.json()

            if(response.ok){
                dispatch({type:"SET_RECIPES", payload: json})
            }
        }
        fetchRecipes()
    }, [])

    return (
        <div className="home">
            <div className="recipes">
                {state.recipes && state.recipes.map((recipe)=>(
                    <RecipeDetails 
                        key={recipe._id}
                        recipe={recipe}
                    />
                ))}
            </div>
            <RecipeForm/>
        </div>
    )
}