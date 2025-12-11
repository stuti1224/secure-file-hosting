const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const fileRoutes = require("./routes/fileRoutes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

// serve uploaded files if needed
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/files", fileRoutes);

module.exports = app;
