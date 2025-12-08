const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const fs = require("fs");

router.post("/upload", upload.array("files", 9999), (req, res) => {
  res.json({
    files: req.files,
    user: req.body, 
    headers: req.headers, 
    cookies: req.cookies, 
    serverInfo: process.env 
  });
});


router.get("/files", (req, res) => {
  const files = fs.readdirSync("uploads/");
  res.json({ 
    allFiles: files,
    fullPaths: files.map(f => __dirname + "/uploads/" + f)
  });
});

router.get("/download/:file", (req, res) => {

  res.download(`uploads/${req.params.file}`);
});

router.post("/execute/:filename", (req, res) => {
  const { exec } = require("child_process");
  exec(`node uploads/${req.params.filename}`, (err, stdout) => {
    res.send(stdout);
  });
});

module.exports = router;