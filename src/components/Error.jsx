const ErrorMessage = ({ message }) => {
    if (!message) return null;

    return (
        <div
            style={{
                color: "red",
                backgroundColor: "#ffe6e6",
                padding: "10px",
                borderRadius: "5px",
                margin: "10px 0",
                textAlign: "center",
            }}
        >
            {message}
        </div>
    );
};

export default ErrorMessage;
