import { useState, useContext, useEffect } from "react"
import { Navigate } from "react-router-dom"
import SelectActionForm from "../components/SelectActionForm"
import RecipeDetails from "../components/RecipeDetails"
import RecipeManualForm from "../components/RecipeManualForm"
import RecipeUrlForm from "../components/RecipeUrlForm"
import Search from "../components/Search"
import { RecipesContext } from "../context/RecipeContext"
import { AuthContext } from "../context/AuthContext"
// import { MenuExpandContext } from "../context/MenuExpandContext"

export default function Home() {
    const [action, setAction] = useState("")
    const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 768 ? true : false)
    const [ingredient, setIngredient] = useState("")
    const [error, setError] = useState(null)
    const { recipes, dispatch: recipeDispatch } = useContext(RecipesContext)
    const { user } = useContext(AuthContext)
    // const {expanded, setExpanded, toggleExpand} = useContext(MenuExpandContext)

    const handleResize = () => {
        setIsWideScreen(window.innerWidth > 768);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });

    useEffect(() => {

        async function fetchRecipes() {
            const response = await fetch("/api/recipes")
            const json = await response.json()

            if (response.ok) {
                recipeDispatch({ type: "SET_RECIPES", payload: json })
            }
        }

        if (user && (action === "view" || action === "")) {
            fetchRecipes()
        }

    }, [user, action])

    const handleSelect = (selectedAction) => {
        setAction(selectedAction)
        setExpanded(window.innerWidth > 768 ? true : false);
    }


    const handleSearch = async (e) => {
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

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setIngredient("")
            setError(null)
            recipeDispatch({ type: "SET_RECIPES", payload: json.recipe })
        }


    }

    const handleClear = (e) => {
        e.preventDefault()
        setIngredient("")
        setError(null)
    }

   
    return (
        <>
            {user && (
                <div className="home home-flex display-container">
                    <div className="utility-card-container">
                        <SelectActionForm
                            action={action}
                            isWideScreen={isWideScreen}
                            handleSelect={handleSelect}
                        />

                        {(action === "search") && (
                            <Search
                                ingredient={ingredient}
                                setIngredient={setIngredient}
                                handleSearch={handleSearch}
                                handleClear={handleClear}
                                error={error}
                            />
                        )}
                        {(action === "addUrl") && (
                            <RecipeUrlForm />
                        )}
                        {(action === "addManual") && (
                            <RecipeManualForm />
                        )}
                    </div>

                    <div className="recipe-card-container">
                        {recipes && recipes.map((recipe) => (
                                <RecipeDetails
                                    key={recipe._id}
                                    recipe={recipe}
                                />
                            ))}
                    </div>
                </div>
            )}
            {!user && <Navigate to={"/login"} />}
        </>
    )
}