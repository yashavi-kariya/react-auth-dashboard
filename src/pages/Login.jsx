import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/login.css"; // Reuse modern login styles

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!username || !password) {
            return alert("Please enter both username and password.");
        }

        try {
            // Attempt to log in via the backend API
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            // This block handles the 400/401/404 errors you are encountering
            const data = await res.json();

            if (!res.ok) {
                // This alert will show the exact message from your backend, 
                // e.g., "User not found" or "Invalid password"
                return alert(data.message || "Login failed. Check your credentials.");
            }

            // If login is successful (Status 200 OK):
            localStorage.setItem("token", data.token); // Store the token

            if (data.user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/user");
            }

        } catch (err) {
            console.error("Login network error:", err);
            alert("Could not connect to the server. Please ensure the backend is running.");
        }
    };


    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2 className="auth-title">Welcome Back</h2>
                <p className="auth-subtitle">Sign in to your account.</p>

                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        placeholder="Enter your username"
                        onChange={(e) => setUsername(e.target.value)}
                        className="auth-input"
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="auth-input"
                        required
                    />
                </div>

                <button onClick={handleLogin} className="auth-button">
                    Login
                </button>

                <p className="auth-footer-text">
                    Don't have an account? <Link to="/auth/register" className="auth-link">Register here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
