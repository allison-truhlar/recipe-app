export default function Navbar() {
  return (
    <header>
      <div className="display-container">
        <nav>
          <div className="flex">
            <h1>Recipe Keeper</h1>
            {/* Plain <a>, not <Link>: /manage must be a full page load so Cloudflare Access can gate it. */}
            <a className="btn btn-outlined" href="/manage">Manage recipes</a>
          </div>
          <p>Your favorite recipes, in one place</p>
        </nav>
      </div>
    </header>
  )
}
