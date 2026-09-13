const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const tokenRoutes = require("./routes/tokenRoutes");
const connectDB = require("./config/db");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/token", tokenRoutes);

// Database connection
connectDB();

// Test route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Access Token Validator API is working"
    });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});