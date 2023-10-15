export default function RecipeUrlForm(props) {
    
    return(
        <form className="card" onSubmit={(e) => props.handleSearch(e)}>
            <h3>Search recipes by ingredient</h3>
            
            <label>Ingredient name:</label>
            <input 
                type="text"
                onChange={(e) => props.setIngredient(e.target.value)}
                value={props.ingredient}
            />

            <button>Search</button>
            {props.error && <div className="error">{props.error}</div>}
        </form>
    )
}


