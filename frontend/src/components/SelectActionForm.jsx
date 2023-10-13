import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export default function SelectActionForm(props) {

    const {user} = useContext(AuthContext)
    
    return(
        <div className="create">
            {user && (
                        <div>
                            <p>What's cooking, {user.username}? </p>
                        </div>
                    )}
            
            {/* <label>Ingredient name:</label>
            <input 
                type="text"
                onChange={(e) => props.setIngredient(e.target.value)}
                value={props.ingredient}
            /> */}
            <button>View all my recipes</button>
            <button>Search all my recipes</button>
            <button>Add a recipe with URL</button>
            <button>Add a recipe manually</button>
            {props.error && <div className="error">{props.error}</div>}
        </div>
    )
}
