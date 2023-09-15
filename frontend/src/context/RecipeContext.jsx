import {createContext, useReducer} from "react"

export const RecipesContext = createContext()

export const recipesReducer = (state, action) => {
    switch(action.type){
        case "SET_RECIPES":
            return {
                recipes: action.payload
            }
        case "CREATE_RECIPE":
            return {
                recipes: [action.payload, ...state.recipes]
            }
        case "DELETE_RECIPE":
            return {
                recipes: action.payload
            }
        default:
            return state
    }
}

export function RecipesContextProvider(props){
    const [state, dispatch] = useReducer(recipesReducer, {
        recipes: null
    })

    return(
        <RecipesContext.Provider value={{state, dispatch}}>
            {props.children}
        </RecipesContext.Provider>
    )
}