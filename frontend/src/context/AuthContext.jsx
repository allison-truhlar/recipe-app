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
            const response = await fetch("/api/user/checkAuth")
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'LOGIN', payload: json}) 
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