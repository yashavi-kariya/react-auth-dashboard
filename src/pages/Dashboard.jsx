import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

const Dashboard = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <p>Welcome! You are logged in 🔐</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Dashboard;
