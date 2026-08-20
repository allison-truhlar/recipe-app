import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <header>
      <div className="display-container">
        <nav>
          <div className="flex">
            <h1>Recipe Keeper</h1>
            <Link className="btn btn-outlined" to="/manage">Manage recipes</Link>
          </div>
          <p>Your favorite recipes, in one place</p>
        </nav>
      </div>
    </header>
  )
}
