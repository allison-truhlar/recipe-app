import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export function useLogout(){
    const {dispatch} = useContext(AuthContext)

    function logout(){
        //remove user from local storage
        localStorage.removeItem("user")

        //update AuthContext state
        dispatch({type:"LOGOUT"})
    }
    
    return {logout}

}