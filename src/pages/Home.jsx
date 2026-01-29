import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            {/* Simple icon or illustration placeholder */}
            <div className="hero-icon">⚙️</div>

            <h1 className="main-title">
                Welcome to **Admin Dashboard Pro**
            </h1>

            <p className="app-description">
                A robust platform for managing users, tracking analytics, and configuring system settings. Built with React and local storage capabilities for seamless demonstrations.
            </p>

            <div className="home-buttons">
                <button onClick={() => navigate("/login")} className="primary-btn">
                    Login
                </button>
                <button onClick={() => navigate("/auth/register")} className="secondary-btn">
                    Register
                </button>
            </div>

            <footer className="home-footer">
                Manage your application with ease and efficiency.
            </footer>
        </div>
    );
};

export default Home;
