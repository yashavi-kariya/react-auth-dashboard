const express = require("express");
const cors = require("cors");

require("./config/env");

const authRoutes = require("./routes/authRoutes");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(express.json());



// Routes
app.use("/api", authRoutes);

// Error handler (must be last)
app.use(errorHandler);

module.exports = app;
