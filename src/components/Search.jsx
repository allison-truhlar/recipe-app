export default function RecipeUrlForm(props) {
    
    return(
        <form className="card search-card" >
            <h3>Search recipes by ingredient</h3>
            
            <label>Ingredient name:</label>
            <input 
                type="text"
                onChange={(e) => props.setIngredient(e.target.value)}
                value={props.ingredient}
            />
            <div className="flex search-btn-container">
                <button type="submit" className="btn submit-btn" onClick={(e) => props.handleSearch(e)}>Search</button>
                <button className="btn clear-btn" onClick={(e) => props.handleClear(e)}>Clear</button>
            </div>
            {props.error && <div className="error">{props.error}</div>}
        </form>
    )
}


