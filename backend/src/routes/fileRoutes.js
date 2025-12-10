const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const auth = require("../middlewares/auth");
const File = require("../models/File");

router.post("/upload", auth, upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // Save file info in DB
  const savedFile = await File.create({
    filename: req.file.filename,
    path: req.file.path,
    size: req.file.size,
    user: req.user.id
  });

  res.json({
    message: "File uploaded successfully",
    file: savedFile
  });
});

module.exports = router;