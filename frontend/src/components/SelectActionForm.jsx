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
            
            <button 
                className="btn select-action-btn"
                onClick={()=> props.handleSelect("view")}
            >View my recipes</button>

            <button 
                className="btn select-action-btn"
                onClick={()=> props.handleSelect("search")}
            >Search my recipes</button>

            <button 
                className="btn select-action-btn"
                onClick={()=> props.handleSelect("addUrl")}
            >Add a recipe with URL
            </button>

            <button 
                className="btn select-action-btn"
                onClick={()=> props.handleSelect("addManual")}
            >Add a recipe manually
            </button>

            {props.error && <div className="error">{props.error}</div>}
        </div>
    )
}
