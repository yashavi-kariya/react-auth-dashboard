import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/dashboard.css";

// Helper function to simulate getting logged-in user info from storage
const getLoggedInUserInfo = () => {
    const token = localStorage.getItem('token');
    if (token === 'admin_token_xyz') {
        return { username: 'Admin User', role: 'admin' };
    } else if (token === 'user_token_abc') {
        return { username: 'Standard User', role: 'user' };
    }
    return { username: 'Guest', role: 'user' };
};

// --- NEW TASK MANAGEMENT LOGIC ---
const getUserTasksFromStorage = () => {
    const tasksJson = localStorage.getItem('user_tasks');
    return tasksJson ? JSON.parse(tasksJson) : [
        { id: 't1', text: 'Complete React dashboard updates', completed: false },
        { id: 't2', text: 'Attend team meeting', completed: false },
        { id: 't3', text: 'Submit expense report', completed: true },
    ];
};

const saveUserTasksToStorage = (tasks) => {
    localStorage.setItem('user_tasks', JSON.stringify(tasks));
};
// ----------------------------------


const UserDashboard = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(getLoggedInUserInfo());
    const [activeTab, setActiveTab] = useState('profile');

    // --- NEW TASK MANAGEMENT STATE ---
    const [tasks, setTasks] = useState(getUserTasksFromStorage());
    const [newTaskText, setNewTaskText] = useState('');

    // Sync tasks with localStorage
    useEffect(() => {
        saveUserTasksToStorage(tasks);
    }, [tasks]);

    // Add Task Function
    const handleAddTask = (e) => {
        e.preventDefault();
        if (!newTaskText.trim()) return;
        const newTask = {
            id: Date.now().toString(),
            text: newTaskText,
            completed: false,
        };
        setTasks([...tasks, newTask]);
        setNewTaskText('');
    };

    // Delete Task Function
    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };
    // ----------------------------------


    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'tasks':
                return (
                    <div className="tab-content">
                        <h2>My Tasks</h2>
                        <form onSubmit={handleAddTask} className="add-user-form">
                            <input
                                type="text"
                                placeholder="Add a new task..."
                                value={newTaskText}
                                onChange={(e) => setNewTaskText(e.target.value)}
                                required
                            />
                            <button type="submit">Add Task</button>
                        </form>
                        <p>You have {tasks.filter(t => !t.completed).length} outstanding tasks:</p>
                        <ul className="user-list">
                            {tasks.map((task) => (
                                <li key={task.id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                                    {task.text}
                                    <button onClick={() => handleDeleteTask(task.id)} className="delete-btn">
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            case 'settings':
                return (
                    <div className="tab-content">
                        <h2>Settings</h2>
                        <p>Change your preferences here.</p>
                    </div>
                );
            case 'profile':
            default:
                return (
                    <div className="tab-content">
                        <h2>Welcome, {userInfo.username}!</h2>
                        <p>Role: {userInfo.role}</p>
                        <p>This is your personalized profile overview.</p>
                    </div>
                );
        }
    };

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>User Dashboard</h1>
                <button className="logout-btn" onClick={logout}>Logout</button>
            </header>

            <nav className="dashboard-nav">
                <button
                    onClick={() => setActiveTab('profile')}
                    className={activeTab === 'profile' ? 'active' : ''}
                >
                    My Profile
                </button>
                <button
                    onClick={() => setActiveTab('tasks')}
                    className={activeTab === 'tasks' ? 'active' : ''}
                >
                    My Tasks
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

export default UserDashboard;
