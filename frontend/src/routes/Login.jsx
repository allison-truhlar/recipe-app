import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export default function Login(){
    const {state, dispatch} = useContext(AuthContext)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleSubmit(e){
        e.preventDefault()

        const user = {email, password}

        const response = await fetch("/api/user/login", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const json = await response.json()

        if(!response.ok){
            console.log(json.error)
        }
        if(response.ok){
            console.log("logged in")
            setEmail("")
            setPassword("")
            dispatch({type: "LOGIN", payload: json})
        }

    }

    return(
        <form className="login" onSubmit={handleSubmit}>
            <h3>Login</h3>

            <label>Email:</label>
            <input
                type= "email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            <label>Password:</label>
            <input
                type= "password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <button>Login</button>
        </form>
    )

}