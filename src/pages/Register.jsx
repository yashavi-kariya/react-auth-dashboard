import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/login.css";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (!username || !password) return alert("Please fill in all fields.");

        try {
            const res = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password, role }),
            });

            const data = await res.json();

            if (res.ok) {
                alert("Registration successful! You can now log in.");
                navigate("/login");
            } else {
                alert(data.message || "Registration failed.");
            }
        } catch (error) {
            alert("Could not connect to the server. Check if backend is running.");
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

                    <h2 className="auth-title">Create Account</h2>
                    <p className="auth-subtitle">Join the professional workspace.</p>

                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            placeholder="e.g. alex_dev"
                            onChange={(e) => setUsername(e.target.value)}
                            className="auth-input"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-wrapper">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Create secure password"
                                onChange={(e) => setPassword(e.target.value)}
                                className="auth-input"
                            />
                            <button
                                type="button"
                                className="toggle-eye"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "👁️" : "🙈"}
                            </button>
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="role-select">Access Level</label>
                        <select
                            id="role-select"
                            onChange={(e) => setRole(e.target.value)}
                            className="auth-input" /* Shared styling for consistency */
                            value={role}
                        >
                            <option value="user">Standard User</option>
                            <option value="admin">Administrator</option>
                        </select>
                    </div>

                    <button onClick={handleRegister} className="auth-button">
                        Register Now
                    </button>

                    <p className="auth-footer-text">
                        Already have an account? <Link to="/login" className="auth-link">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
