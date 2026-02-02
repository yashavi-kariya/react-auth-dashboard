import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
    const navigate = useNavigate();
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [theme]);

    return (
        <div className="app-wrapper">
            {/* 1. PROFESSIONAL STICKY HEADER */}
            <header className={`navbar-pro ${scrolled ? "floating" : ""}`}>
                <div className="nav-inner">
                    <div className="nav-left">
                        <div className="site-logo" onClick={() => navigate("/")}>
                            <div className="logo-symbol">N</div>
                            <span className="logo-text">Nexus<b>Task</b></span>
                        </div>
                        <nav className="nav-links">
                            <a href="#admin">Admin View</a>
                            <a href="#user">User Portal</a>
                        </nav>
                    </div>

                    <div className="nav-right">
                        <button className="theme-toggle-btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                            {theme === "dark" ? "☀️" : "🌙"}
                        </button>
                        <button className="btn-secondary" onClick={() => navigate("/login")}>Login</button>
                        <button className="btn-primary" onClick={() => navigate("/auth/register")}>Register Now</button>
                    </div>
                </div>
            </header>

            {/* 2. HERO SECTION WITH BG IMAGE */}
            <main className="hero-section">
                <div className="hero-overlay">
                    <div className="hero-content">
                        {/* <span className="badge">New: Team Workspaces 2.0</span> */}
                        <h1>Manage Tasks. <br /><span>Empower Teams.</span></h1>
                        <p>The all-in-one task management suite designed for administrative precision and seamless user collaboration.</p>
                        <div className="hero-actions">
                            <button className="btn-main" onClick={() => navigate("/auth/register")}>Get Started Free</button>
                            {/* <button className="btn-outline">Watch Live Demo</button> */}
                        </div>
                    </div>

                    {/* 3. DUAL-ROLE CONTENT (ADMIN VS USER) */}
                    <section className="role-grid">
                        <div className="role-card admin-card" id="admin">
                            <div className="role-icon">🛡️</div>
                            <h3>For Administrators</h3>
                            <ul>
                                <li>Real-time team oversight and KPI tracking.</li>
                                <li>Granular permission and role management.</li>
                                <li>Custom workflows and automated reporting.</li>
                            </ul>
                        </div>
                        <div className="role-card user-card" id="user">
                            <div className="role-icon">👥</div>
                            <h3>For Team Users</h3>
                            <ul>
                                <li>Personalized dashboards and smart task filters.</li>
                                <li>Direct thread collaboration and file sharing.</li>
                                <li>Integrated notifications and deadline alerts.</li>
                            </ul>
                        </div>
                    </section>
                </div>
            </main>

            {/* 4. MODERN BENTO FOOTER */}
            <footer className="main-footer">
                <div className="footer-top">
                    <div className="footer-cta">
                        <h2>Ready to boost your productivity?</h2>
                        <p>Join over 10,000+ teams using NexusTask every day.</p>
                        <div className="subscribe-box">
                            <input type="email" placeholder="Enter your email" />
                            <button>Get Started</button>
                        </div>
                    </div>
                </div>

                <div className="footer-grid">
                    <div className="footer-info">
                        <div className="site-logo">
                            <div className="logo-symbol">N</div>
                            <span className="logo-text">Nexus<b>Task</b></span>
                        </div>
                        <p className="footer-desc">
                            The next generation of task management. Built for speed,
                            designed for clarity, and engineered for scale.
                        </p>
                        <div className="social-links">
                            <span>𝕏</span> <span>🌐</span> <span>💼</span> <span>📸</span>
                        </div>
                    </div>

                    <div className="footer-links-wrapper">
                        <div className="footer-col">
                            <h4>Platform</h4>
                            <a href="#">Admin Panel</a>
                            <a href="#">User Dashboard</a>
                            <a href="#">Integrations</a>
                        </div>
                        <div className="footer-col">
                            <h4>Support</h4>
                            <a href="#">Help Center</a>
                            <a href="#">API Docs</a>
                            <a href="#">Community</a>
                        </div>
                        <div className="footer-col">
                            <h4>Company</h4>
                            <a href="#">Careers</a>
                            <a href="#">Privacy</a>
                            <a href="#">Security</a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© 2025 Nexus Technology Group.</p>
                    <div className="legal-links">
                        <span>Status: All Systems Operational</span>
                    </div>
                </div>
            </footer>

        </div>
    );
};

export default Home;
