import { useState, useContext } from "react"
import { RecipesContext } from "../context/RecipeContext"
import { AuthContext } from "../context/AuthContext"

export default function RecipeUrlForm() {
    const [url, setUrl] = useState("")
    const [error, setError] = useState(false)
    const [msg, setMsg] = useState(null)
    const {dispatch} = useContext(RecipesContext)
    const {user} = useContext(AuthContext)

    const handleSubmit = async (e) =>{
        e.preventDefault()

        if (!user) {
            setError(true)
            setMsg("You must be logged in")
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
        setMsg(json.msg)
        console.log(response)

        if(!response.ok){
            setError(true)
        }
        if(response.ok){
            setUrl("")
            setError(false)
            dispatch({type: "CREATE_RECIPE", payload: json.recipe})
        }

    }

    return(
        <form className="card url-card" onSubmit={handleSubmit}>
            <h3>Add Recipe with URL</h3>
            
            <label>Recipe URL:</label>
            <input 
                type="text"
                onChange={(e) => setUrl(e.target.value)}
                value={url}
            />

            <button className="btn submit-btn">Add recipe</button>
                <div className={`${error && "error"} msg`}>
                    {msg}
                </div>
        </form>
    )
}


