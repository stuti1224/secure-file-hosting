const authRoutes = require("./routes/auth.routes");
const express = require("express");
const fileRoutes = require("./routes/fileRoutes");

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/files", fileRoutes);

module.exports = app;
