import { useState, useContext } from "react"
import { Navigate, Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

export default function Login() {
    const { user, dispatch } = useContext(AuthContext)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    async function handleSubmit(e) {
        e.preventDefault()
        setIsLoading(true)
        setError(null)


        if(!username || !password){
            setError("All fields must be filled")
        }

        const response = await fetch("/api/user/login", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const json = await response.json()
        console.log(json)

        if (!response.ok) {
            setError(json.error)
            setIsLoading(false)
        }
        if (response.ok) {
            //update auth context
            dispatch({ type: "LOGIN", payload: json })

            //update local state
            setUsername("")
            setPassword("")
            setError(null)
            setIsLoading(false)
        }

    }

    return (
        <>
            {!user && (
                <form className="login" onSubmit={handleSubmit}>
                    <h3>Login</h3>

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

                    <button disabled={isLoading}>Login</button>
                    {error && <div className="error">{error}</div>}
                    <div className="redirect-link">Don't have an account? <Link to="/signup">Sign up!</Link></div>
                </form>
            )}
            {user && <Navigate to="/" />}
        </>
    )
}