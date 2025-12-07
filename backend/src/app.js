const authRoutes = require("./routes/auth.routes");
const express = require("express");
const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
  res.send("Backend is running!");
});

module.exports = app;
