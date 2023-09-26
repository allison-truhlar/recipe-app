import { useContext } from "react"
import { Link } from "react-router-dom"
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
            <div className="container">
                <Link to="/">
                    <h1>Recipe Keeper</h1>
                </Link>
                <nav>
                    {user && (
                        <div>
                        <span>What's cooking, {user.username}? </span>
                        <button onClick={handleLogoutClick}>Log out</button>
                    </div>
                    )}
                    {!user && (
                        <div>
                            <Link to="/login">Log in</Link>
                            <Link to="/signup">Sign up</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}