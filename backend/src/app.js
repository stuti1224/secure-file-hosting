const authRoutes = require("./routes/auth.routes");
const express = require("express");
const fileRoutes = require("./routes/fileRoutes");

const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type, Authorization"
}));

app.use("/api/auth", authRoutes);
app.use("/api/files", fileRoutes);

module.exports = app;
