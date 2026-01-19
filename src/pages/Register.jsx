import { useNavigate } from "react-router-dom";
import "../styles/register.css";
import { useState } from "react";

const Register = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        setTimeout(() => {
            // get users from localStorage
            const users = JSON.parse(localStorage.getItem("users") || "[]");

            // check duplicate email
            if (users.find(u => u.email === form.email)) {
                setError("Email already exists");
                setLoading(false);
                return;
            }

            // save new user
            const newUser = { id: Date.now(), name: form.name, email: form.email };
            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));

            setSuccess("Registration successful");
            setForm({ name: "", email: "", password: "" });

            setTimeout(() => {
                navigate("/users"); // redirect to users page
            }, 2000);

            setLoading(false);
        }, 1000);
    };

    return (
        <div className="register">
            <div className="register-box">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
                    <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />

                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {success && <p style={{ color: "green" }}>{success}</p>}

                    <button type="submit" disabled={loading}>
                        {loading ? "Registering..." : "Create Account"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
