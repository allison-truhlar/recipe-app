import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export default function Signup(){
    const {state, dispatch} = useContext(AuthContext)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError]=useState(null)
    const [isLoading, setIsLoading] = useState(null)

    async function handleSubmit(e){
        e.preventDefault()
        setIsLoading(true)

        const response = await fetch("/api/user/signup", {
            method: "POST",
            body: JSON.stringify({email, password}),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const json = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            //save user to local storage
            localStorage.setItem("user", JSON.stringify(json))

            //update auth context
            dispatch({type: "LOGIN", payload: json})

            //update local state
            setIsLoading(false)
            setEmail("")
            setPassword("")
            setError(null)
        }

    }

    return(
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign up</h3>

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

            <button disabled={isLoading}>Sign up</button>
            {error && <div className="error">{error}</div>}
        </form>
    )

}