const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const File = require("../models/File");

// DOWNLOAD FILE
router.get("/download/:id", auth, async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) return res.status(404).json({ message: "File not found" });

    // Check Ownership
    if (file.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.download(file.path);

  } catch (error) {
    res.status(500).json({ message: "Download failed", error: error.message });
  }
});

module.exports = router;
