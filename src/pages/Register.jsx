import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/login.css"; // Reuse existing login styles for consistency

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (!username || !password) {
            return alert("Please fill in all fields.");
        }

        try {
            // *** UNCOMMENT AND USE THIS FETCH REQUEST ***
            const res = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password, role }),
            });

            // Handle potential 404 Not Found errors from the server
            if (res.status === 404) {
                alert("API Endpoint Not Found (404). Check your backend server URL.");
                return;
            }

            const data = await res.json();

            if (res.ok) {
                alert("Registration successful! You can now log in.");
                navigate("/login");
            } else {
                // Display error messages from the backend (e.g., "Username already exists")
                alert(data.message || "Registration failed.");
            }

        } catch (error) {
            // Handle network errors (e.g., backend server is offline)
            console.error("Network error during registration:", error);
            alert("Could not connect to the server. Is the backend running on port 5000?");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                {/* ... (rest of your UI code is the same) ... */}
                <h2 className="auth-title">Create Account</h2>
                <p className="auth-subtitle">Join our platform today.</p>

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
                        placeholder="Enter a secure password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="auth-input"
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="role-select">Select Role (Admin Only)</label>
                    <select
                        id="role-select"
                        onChange={(e) => setRole(e.target.value)}
                        className="auth-select"
                        value={role}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <button onClick={handleRegister} className="auth-button">
                    Register Now
                </button>

                <p className="auth-footer-text">
                    Already have an account? <Link to="/login" className="auth-link">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
