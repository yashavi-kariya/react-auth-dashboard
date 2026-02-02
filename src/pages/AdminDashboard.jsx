import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "../styles/AdminDashboard.css";

const getUsersFromStorage = () => {
    const usersJson = localStorage.getItem('admin_users_data');
    return usersJson ? JSON.parse(usersJson) : [
        { id: '1', username: 'admin_user', role: 'admin', created: Date.now() - 86400000 },
        { id: '2', username: 'john_doe', role: 'user', created: Date.now() - 3600000 },
    ];
};

const saveUsersToStorage = (users) => {
    localStorage.setItem('admin_users_data', JSON.stringify(users));
};

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState(getUsersFromStorage);
    const [newUsername, setNewUsername] = useState('');
    const [newUserRole, setNewUserRole] = useState('user');
    const [activeTab, setActiveTab] = useState('dashboard');
    const [allowRegistration, setAllowRegistration] = useState(true);

    useEffect(() => {
        saveUsersToStorage(users);
    }, [users]);

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleDeleteUser = (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            setUsers(users.filter(user => user.id !== userId));
        }
    };

    const handleAddUser = (e) => {
        e.preventDefault();
        if (!newUsername.trim()) return;
        const newUser = { id: Date.now().toString(), username: newUsername, role: newUserRole, created: Date.now() };
        setUsers([...users, newUser]);
        setNewUsername('');
    };

    useEffect(() => {
        // Sync theme with localStorage on mount
        const savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
    }, []);


    return (
        <div className="dashboard-wrapper">
            {/* SIDEBAR NAVIGATION */}
            <aside className="sidebar">
                <div className="sidebar-brand">
                    <div className="logo-icon">N</div>
                    <span>Nexus<b>Admin</b></span>
                </div>
                <nav className="sidebar-nav">
                    <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>📊 Overview</button>
                    <button className={activeTab === 'manage-users' ? 'active' : ''} onClick={() => setActiveTab('manage-users')}>👥 Users</button>
                    <button className={activeTab === 'reports' ? 'active' : ''} onClick={() => setActiveTab('reports')}>📈 Reports</button>
                    <button className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>⚙️ Settings</button>
                </nav>
                <button className="sidebar-logout" onClick={logout}>🚪 Logout</button>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className="dashboard-main">
                <header className="top-bar">
                    <h2>{activeTab.replace('-', ' ').toUpperCase()}</h2>
                    <div className="user-profile">
                        <span>Admin Account</span>
                        <div className="avatar">AD</div>
                    </div>
                </header>

                <div className="dashboard-content">
                    {activeTab === 'dashboard' && (
                        <div className="overview-grid">
                            <div className="stat-card">
                                <h3>Total Users</h3>
                                <p className="stat-number">{users.length}</p>
                            </div>
                            <div className="stat-card">
                                <h3>Admins</h3>
                                <p className="stat-number">{users.filter(u => u.role === 'admin').length}</p>
                            </div>
                            <div className="stat-card">
                                <h3>System Status</h3>
                                <p className="stat-status">Healthy</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'manage-users' && (
                        <div className="user-management glass-card">
                            <form onSubmit={handleAddUser} className="inline-form">
                                <input type="text" placeholder="Username" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} required />
                                <select value={newUserRole} onChange={(e) => setNewUserRole(e.target.value)}>
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                                <button type="submit" className="primary-btn">Add User</button>
                            </form>
                            <table className="admin-table">
                                <thead>
                                    <tr><th>Username</th><th>Role</th><th>Actions</th></tr>
                                </thead>
                                <tbody>
                                    {users.map(u => (
                                        <tr key={u.id}>
                                            <td>{u.username}</td>
                                            <td><span className={`role-badge ${u.role}`}>{u.role}</span></td>
                                            <td><button className="delete-btn" onClick={() => handleDeleteUser(u.id)}>Delete</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'reports' && (
                        <div className="glass-card">
                            <h3>Registration History</h3>
                            <table className="admin-table">
                                <thead><tr><th>User</th><th>Date</th></tr></thead>
                                <tbody>
                                    {users.slice(-5).map(u => (
                                        <tr key={u.id}><td>{u.username}</td><td>{new Date(u.created).toLocaleDateString()}</td></tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="glass-card settings-panel">
                            <div className="setting-row">
                                <div>
                                    <h4>Allow Public Registration</h4>
                                    <p>Permit new users to create accounts from home page.</p>
                                </div>
                                <input type="checkbox" checked={allowRegistration} onChange={() => setAllowRegistration(!allowRegistration)} />
                            </div>
                            <button className="primary-btn">Save Changes</button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
