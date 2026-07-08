import { NavLink } from "react-router-dom";
import "../styles/nav.css";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar__logo">
        <h1>Moodify</h1>
      </div>

      <nav className="navbar__links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/history">History</NavLink>
        <NavLink to="/upload">Upload</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>

      <div className="navbar__profile">
        <button className="navbar__logout">Logout</button>

        <div className="navbar__avatar">
          <span>D</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
