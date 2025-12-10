const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const auth = require("../middlewares/auth");
const File = require("../models/File");

// DOWNLOAD FILE BY ID
router.get("/download/:id", auth, async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) return res.status(404).json({ message: "File not found" });

    // Check ownership
    if (file.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.download(file.path);

  } catch (error) {
    res.status(500).json({ message: "Download failed", error: error.message });
  }
});

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