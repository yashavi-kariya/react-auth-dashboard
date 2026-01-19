const UserCard = ({ user }) => {
    return (
        <div
            style={{
                border: "1px solid #ddd",
                padding: "15px",
                borderRadius: "8px",
                marginBottom: "10px",
            }}
        >
            <h3>{user.name}</h3>
            <p>{user.email}</p>
        </div>
    );
};

export default UserCard;
