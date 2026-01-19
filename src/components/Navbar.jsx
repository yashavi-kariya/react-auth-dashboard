import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <h2 className="logo">My App</h2>

            <div className="nav-links">
                <NavLink to="/dashboard" className="nav-link">
                    Dashboard
                </NavLink>

                <NavLink to="/users" className="nav-link">
                    Users
                </NavLink>

                <NavLink to="/about" className="nav-link">
                    About
                </NavLink>

                <NavLink to="/register" className="nav-link">
                    Register
                </NavLink>

                <span
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                    onClick={logout}
                >
                    Logout
                </span>
            </div>
        </nav>
    );
};

export default Navbar;
