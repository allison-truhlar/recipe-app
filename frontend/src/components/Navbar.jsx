import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { RecipesContext } from "../context/RecipeContext"

export default function Navbar(){
    const {user, dispatch: userDispatch} = useContext(AuthContext)
    const { dispatch: recipeDispatch } = useContext(RecipesContext)

    async function handleLogoutClick(e){
        e.preventDefault()

        const response = await fetch("/api/user/logout")

        const json = await response.json()
        console.log(json)

        if(!response.ok){
            console.log(json.error)
        }
        if(response.ok){
            //update AuthContext state
            userDispatch({type:"LOGOUT"})
            //clear recipe state
            recipeDispatch({type:"SET_RECIPES", payload:null})
            
        }
    }

    return(
        <header>
            <div className="display-container">
                <nav>
                    <div className="flex">
                        <h1>Recipe Keeper</h1>
                        {user && (
                            <button className="btn btn-outlined logout-btn" onClick={handleLogoutClick}>Log out</button>
                        )}
                    </div>
                    <p>Your favorite recipes, in one place</p>
                </nav>
            </div>
        </header>
    )
}