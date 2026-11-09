
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">

        <Link className="navbar-brand fw-bold" to="/">
          🍳 RecipeFinder
        </Link>

        <div className="navbar-nav ms-auto flex-row">
          <Link className="nav-link" to="/">
            Home
          </Link>

          <Link className="nav-link" to="/planner">
            Meal Planner
          </Link>
        </div>

      </div>
    </nav>
  );
}
