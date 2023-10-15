import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export default function SelectActionForm(props) {

    const {user} = useContext(AuthContext)
    
    return(
        <div className="card">
            {user && (
                        <div>
                            <h3>What's cooking, {user.username}? </h3>
                        </div>
                    )}
            
            {/* <label>Ingredient name:</label>
            <input 
                type="text"
                onChange={(e) => props.setIngredient(e.target.value)}
                value={props.ingredient}
            /> */}
            <button>View my recipes</button>
            <button>Search my recipes</button>
            <button>Add a recipe with URL</button>
            <button>Add a recipe manually</button>
            {props.error && <div className="error">{props.error}</div>}
        </div>
    )
}
