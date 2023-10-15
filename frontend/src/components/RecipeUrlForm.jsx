import { useState, useContext } from "react"
import { RecipesContext } from "../context/RecipeContext"
import { AuthContext } from "../context/AuthContext"

export default function RecipeUrlForm() {
    const [url, setUrl] = useState("")
    const [error, setError] = useState(null)
    const {dispatch} = useContext(RecipesContext)
    const {user} = useContext(AuthContext)

    const handleSubmit = async (e) =>{
        e.preventDefault()

        if (!user) {
            setError("You must be logged in")
            return
        }

        const response = await fetch("/api/recipes/url", {
            method: "POST",
            body: JSON.stringify({ url }),
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
            setUrl("")
            setError(null)
            dispatch({type: "CREATE_RECIPE", payload: json})
        }


    }

    return(
        <form className="card" onSubmit={handleSubmit}>
            <h3>Add Recipe with URL</h3>
            
            <label>Recipe URL:</label>
            <input 
                type="text"
                onChange={(e) => setUrl(e.target.value)}
                value={url}
            />

            <button>Add recipe</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}


