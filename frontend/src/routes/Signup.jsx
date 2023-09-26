import { useState, useContext } from "react"
import { Navigate, Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

export default function Signup(){
    // const server = ""
    // // "https://recipe-keeper-ixnb.onrender.com"
  
    const {user, dispatch} = useContext(AuthContext)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError]=useState(null)
    const [isLoading, setIsLoading] = useState(null)

    async function handleSubmit(e){
        e.preventDefault()
        setIsLoading(true)

        const response = await fetch("/api/user/signup", {
            method: "POST",
            body: JSON.stringify({username, password}),
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
            //update auth context
            dispatch({type: "LOGIN", payload: json})

            //update local state
            setIsLoading(false)
            setUsername("")
            setPassword("")
            setError(null)
        }

    }

    return (
        <>
            {!user && (
                <form className="signup" onSubmit={handleSubmit}>
                    <h3>Sign up</h3>

                    <label>Username:</label>
                    <input
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                    />

                    <label>Password:</label>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />

                    <button disabled={isLoading}>Sign up</button>
                    {error && <div className="error">{error}</div>}
                    <div className="redirect-link">Have an account? <Link to="/login">Login!</Link></div>
                </form>
            )}
            {user && <Navigate to="/" />}
        </>
    )
}