import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        localStorage.setItem("token", "dummy-token");
        navigate("/dashboard");
    };

    return (
        <div className="login">
            <div className="login-box">
                <h2>Login</h2>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
};

export default Login;
