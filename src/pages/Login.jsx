import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/login.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
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
        <div className="auth-page-wrapper">
            <div className="auth-nav">
                <Link to="/" className="back-home">← Back to Home</Link>
            </div>

            <div className="auth-container">
                <div className="auth-box">
                    <div className="auth-logo">
                        <div className="logo-symbol">N</div>
                        <span>Nexus<b>Task</b></span>
                    </div>

                    <h2 className="auth-title">Welcome Back</h2>
                    <p className="auth-subtitle">Securely sign in to manage your tasks.</p>

                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            placeholder="e.g. alex_nexus"
                            onChange={(e) => setUsername(e.target.value)}
                            className="auth-input"
                            required
                        />
                    </div>

                    <div className="input-group password-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-wrapper">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                onChange={(e) => setPassword(e.target.value)}
                                className="auth-input"
                                required
                            />
                            <button
                                type="button"
                                className="toggle-eye"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "👁️" : "🙈"}
                            </button>
                        </div>
                        <div className="input-footer">
                            <span className="forgot-trigger" onClick={() => setIsModalOpen(true)}>
                                Forgot Password?
                            </span>
                        </div>
                    </div>

                    <button onClick={handleLogin} className="auth-button">Sign In</button>

                    <p className="auth-footer-text">
                        New to NexusTask? <Link to="/auth/register" className="auth-link">Create an account</Link>
                    </p>
                </div>
            </div>

            {/* FORGOT PASSWORD MODAL */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content glass-card">
                        <h3>Reset Password</h3>
                        <p>Enter your email to receive a recovery link.</p>
                        <input type="email" placeholder="email@nexus.com" className="auth-input" />
                        <div className="modal-actions">
                            <button className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                            <button className="btn-primary" onClick={() => alert('Reset link sent!')}>Send Link</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
