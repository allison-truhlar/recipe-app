import { Link } from "react-router-dom"
import {useLogout} from "../hooks/useLogout"

export default function Navbar(){
    const {logout} = useLogout()

    function handleClick(){
        logout()
    }

    return(
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Recipe Keeper</h1>
                </Link>
                <nav>
                    <div>
                        <button onClick={handleClick}>Log out</button>
                    </div>
                    <div>
                        <Link to="/login">Log in</Link>
                        <Link to="/signup">Sign up</Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}