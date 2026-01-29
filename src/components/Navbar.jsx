import { NavLink, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <h2 className="logo">ProApp</h2>
            <div className="nav-links">
                <NavLink to="/" className="nav-link">Home</NavLink>
                <NavLink to="/register" className="nav-link">Register</NavLink>
                <NavLink to="/login" className="nav-link">Login</NavLink>
                <span className="nav-link" onClick={logout}>Logout</span>
            </div>
        </nav>
    );
};

export default Navbar;
