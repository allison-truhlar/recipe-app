import {createContext, useReducer, useEffect} from "react"

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch(action.type){
        case "LOGIN":
            return {
                user: action.payload
            }
        case "LOGOUT":
            return {
                user: null
            }
        default:
            return state
    }
}

export function AuthContextProvider(props){
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })
    
    useEffect(() => {
        async function checkAuth(){
            const response = await fetch("https://recipe-keeper-ixnb.onrender.com/api/user/checkAuth", {credentials: "same-origin"})
            const json = await response.json()

            if (response.ok) {
                console.log(json)
                dispatch({ type: 'LOGIN', payload: json.username }) 
            }
        }
        checkAuth()
    }, [])

    console.log('AuthContext state:', state)

    return(
        <AuthContext.Provider value={{...state, dispatch}}>
            {props.children}
        </AuthContext.Provider>
    )
}