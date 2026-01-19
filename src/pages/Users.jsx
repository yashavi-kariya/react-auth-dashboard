import { useState, useEffect } from "react";
import "../styles/users.css";

import Loader from "../components/Loader";
import ErrorMessage from "../components/Error";
import UserCard from "../components/UserCard";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchUsers = () => {
        setLoading(true);
        setError("");

        try {
            const data = JSON.parse(localStorage.getItem("users") || "[]");
            setUsers(data);
        } catch {
            setError("Failed to load users");
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="users-page">
            <div className="users-box">
                <h2 className="user-logo">Users List</h2>

                <button onClick={fetchUsers} className="refresh-btn">
                    Refresh
                </button>

                {loading && <Loader text="Loading users..." />}

                <ErrorMessage message={error} />

                {!loading && !error && users.length === 0 && (
                    <p>No users found</p>
                )}

                <div className="users-list">
                    {!loading &&
                        !error &&
                        users.map((user) => (
                            <UserCard key={user.id} user={user} />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Users;
