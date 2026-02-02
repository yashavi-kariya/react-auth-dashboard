import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { LayoutDashboard, CheckSquare, Settings, LogOut, Plus, Trash2, User } from "lucide-react";
import "../styles/UserDashboard.css";


const UserDashboard = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({ username: 'Standard User', role: 'user' });
    const [activeTab, setActiveTab] = useState('profile');
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem('user_tasks');
        return saved ? JSON.parse(saved) : [];
    });
    const [newTaskText, setNewTaskText] = useState('');

    useEffect(() => {
        localStorage.setItem('user_tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleAddTask = (e) => {
        e.preventDefault();
        if (!newTaskText.trim()) return;
        setTasks([{ id: Date.now().toString(), text: newTaskText, completed: false }, ...tasks]);
        setNewTaskText('');
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };
    useEffect(() => {
        // Sync theme with localStorage on mount
        const savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
    }, []);


    return (
        <div className="dashboard-layout">
            {/* SIDEBAR */}
            <aside className="sidebar">
                <div className="sidebar-logo">
                    <div className="logo-icon">N</div>
                    <span>Nexus<b>Task</b></span>
                </div>

                <nav className="sidebar-menu">
                    <button className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>
                        <User size={20} /> Profile
                    </button>
                    <button className={activeTab === 'tasks' ? 'active' : ''} onClick={() => setActiveTab('tasks')}>
                        <CheckSquare size={20} /> My Tasks
                    </button>
                    <button className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>
                        <Settings size={20} /> Settings
                    </button>
                </nav>

                <button className="sidebar-logout" onClick={logout}>
                    <LogOut size={20} /> Logout
                </button>
            </aside>

            {/* MAIN CONTENT */}
            <main className="main-content">
                <header className="top-bar">
                    <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
                    <div className="user-badge">
                        {/* <img src={`https://ui-avatars.com{userInfo.username}&background=random`} alt="avatar" /> */}
                        <span>{userInfo.username}</span>
                    </div>
                </header>

                <div className="content-area">
                    {activeTab === 'tasks' ? (
                        <div className="tasks-container">
                            <form onSubmit={handleAddTask} className="task-input-group">
                                <input
                                    value={newTaskText}
                                    onChange={(e) => setNewTaskText(e.target.value)}
                                    placeholder="Add a new goal..."
                                />
                                <button type="submit"><Plus size={20} /></button>
                            </form>

                            <div className="task-list">
                                {tasks.map(task => (
                                    <div key={task.id} className={`task-card ${task.completed ? 'done' : ''}`}>
                                        <div className="task-info" onClick={() => toggleTask(task.id)}>
                                            <div className="checkbox">{task.completed && "✓"}</div>
                                            <span>{task.text}</span>
                                        </div>
                                        <button className="delete-icon" onClick={() => setTasks(tasks.filter(t => t.id !== task.id))}>
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="glass-card placeholder-view">
                            <h3>{activeTab} view coming soon</h3>
                            <p>We are still polishing this module for you.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default UserDashboard;
