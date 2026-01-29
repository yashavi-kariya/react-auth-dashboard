import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/dashboard.css'; // Make sure you have basic CSS for styling

// Helper function to get users from localStorage
const getUsersFromStorage = () => {
    const usersJson = localStorage.getItem('admin_users_data');
    return usersJson ? JSON.parse(usersJson) : [
        // Seed some initial data if storage is empty
        { id: '1', username: 'admin_user', role: 'admin', created: Date.now() - 86400000 },
        { id: '2', username: 'john_doe', role: 'user', created: Date.now() - 3600000 },
    ];
};

// Helper function to save users to localStorage
const saveUsersToStorage = (users) => {
    localStorage.setItem('admin_users_data', JSON.stringify(users));
};

const AdminDashboard = () => {
    const navigate = useNavigate();
    // Use the functional approach for useState initializer
    const [users, setUsers] = useState(getUsersFromStorage);
    const [newUsername, setNewUsername] = useState('');
    const [newUserRole, setNewUserRole] = useState('user');
    const [activeTab, setActiveTab] = useState('dashboard');
    // New state for settings toggle
    const [allowRegistration, setAllowRegistration] = useState(true);

    // Sync state with localStorage whenever users change
    useEffect(() => {
        saveUsersToStorage(users);
    }, [users]);

    // *** LOGOUT FIX (Navigating to Home) ***
    const logout = () => {
        localStorage.removeItem('token');
        navigate('/'); // Redirect to the main home page
    };
    // ***************************************

    const handleDeleteUser = (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            setUsers(users.filter(user => user.id !== userId));
        }
    };

    const handleAddUser = (e) => {
        e.preventDefault();
        if (!newUsername.trim()) return;

        const newUser = {
            id: Date.now().toString(),
            username: newUsername,
            role: newUserRole,
            created: Date.now(), // Add creation timestamp
        };

        setUsers([...users, newUser]);
        setNewUsername('');
        setNewUserRole('user');
    };


    const renderContent = () => {
        // Dynamic calculations for the Dashboard tab
        const totalUsers = users.length;
        const adminCount = users.filter(u => u.role === 'admin').length;

        switch (activeTab) {
            case 'manage-users':
                return (
                    <div className="tab-content">
                        <h2>Manage Users</h2>
                        <form onSubmit={handleAddUser} className="add-user-form">
                            <input
                                type="text"
                                placeholder="Enter username"
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                                required
                            />
                            <select
                                value={newUserRole}
                                onChange={(e) => setNewUserRole(e.target.value)}
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                            <button type="submit">Add User</button>
                        </form>
                        <ul className="user-list">
                            {users.map((user) => (
                                <li key={user.id}>
                                    {user.username} ({user.role})
                                    <button onClick={() => handleDeleteUser(user.id)} className="delete-btn">
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                );

            // *** UPDATED REPORTS TAB CONTENT ***
            case 'reports':
                return (
                    <div className="tab-content">
                        <h2>System Reports & Analytics</h2>
                        <p>Latest user registration activity:</p>
                        <table>
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Role</th>
                                    <th>Registration Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Show the last 5 users added */}
                                {users.slice(-5).map(user => (
                                    <tr key={user.id}>
                                        <td>{user.username}</td>
                                        <td>{user.role}</td>
                                        <td>{new Date(user.created).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button style={{ marginTop: '10px' }}>Export Full User List (CSV)</button>
                    </div>
                );

            // *** UPDATED SETTINGS TAB CONTENT ***
            case 'settings':
                return (
                    <div className="tab-content">
                        <h2>Global Settings Configuration</h2>
                        <div className="settings-group">
                            <h3>User Management Options</h3>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={allowRegistration}
                                    onChange={() => setAllowRegistration(!allowRegistration)}
                                />
                                Allow new public registrations
                            </label>
                            <p style={{ marginTop: '10px' }}>Default new user role: <strong>{newUserRole}</strong></p>
                        </div>
                        <button style={{ marginTop: '20px' }}>Save Settings</button>
                    </div>
                );

            // *** UPDATED DASHBOARD TAB CONTENT ***
            case 'dashboard':
            default:
                return (
                    <div className="tab-content dashboard-overview">
                        <h2>Welcome Admin</h2>
                        <p>At a glance system summary:</p>
                        <div className="metrics-container" style={{ display: 'flex', gap: '20px' }}>
                            <div className="metric-card" style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
                                <h3>Total Users</h3>
                                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{totalUsers}</p>
                            </div>
                            <div className="metric-card" style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
                                <h3>Admin Count</h3>
                                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{adminCount}</p>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Admin Dashboard</h1>
                <button className="logout-btn" onClick={logout}>Logout</button>
            </header>

            {/* Navigation Tabs (High-level UI Change) */}
            <nav className="dashboard-nav">
                <button
                    onClick={() => setActiveTab('dashboard')}
                    className={activeTab === 'dashboard' ? 'active' : ''}
                >
                    Dashboard
                </button>
                <button
                    onClick={() => setActiveTab('manage-users')}
                    className={activeTab === 'manage-users' ? 'active' : ''}
                >
                    Manage Users
                </button>
                <button
                    onClick={() => setActiveTab('reports')}
                    className={activeTab === 'reports' ? 'active' : ''}
                >
                    Reports
                </button>
                <button
                    onClick={() => setActiveTab('settings')}
                    className={activeTab === 'settings' ? 'active' : ''}
                >
                    Settings
                </button>
            </nav>

            <div className="dashboard-content">
                {renderContent()}
            </div>
        </div>
    );
};

export default AdminDashboard;
