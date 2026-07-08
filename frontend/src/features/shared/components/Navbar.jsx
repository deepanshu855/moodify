import { NavLink, useNavigate } from "react-router-dom";
import "../styles/nav.css";
import { useAuth } from "../../auth/hooks/useAuth";

const Navbar = () => {
  const { loading, user, handleLogout } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <header className="navbar navbar--loading">
        <div className="skeleton-pulse"></div>
      </header>
    );
  }

  const handleClick = async () => {
    await handleLogout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <NavLink to="/" className="navbar__logo">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 4V20M17 9V15M7 9V15M2 12H4.5M19.5 12H22"
            stroke="#8B5CF6"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h1>Moodify</h1>
      </NavLink>

      <nav className="navbar__links">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/history"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          History
        </NavLink>
      </nav>

      <div className="navbar__profile">
        <div className="profile__pill">
          <div className="avatar">
            {user?.username ? user.username.charAt(0).toUpperCase() : "U"}
          </div>
          <span className="username">{user?.username || "User"}</span>

          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#B8C1D1"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="chevron"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>

          {/* Hover Dropdown */}
          <div className="profile__dropdown">
            <button onClick={handleClick} className="dropdown__logout">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
