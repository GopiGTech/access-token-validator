const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();

const tokenRoutes = require("./routes/tokenRoutes");

const connectDB = require("./config/db");

app.use(cors());
app.use(express.json());
app.use("/api/token", tokenRoutes);

connectDB();

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Express server working"
    });
}).listen(process.env.PORT);