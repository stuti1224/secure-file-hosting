const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const upload = require("../middlewares/upload");
const auth = require("../middlewares/auth");
const File = require("../models/File");

/* ================================
   UPLOAD FILE (Protected)
================================= */
router.post("/upload", auth, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const savedFile = await File.create({
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
      user: req.user.id,
      privacy: req.body.privacy === "public" ? "public" : "private"
    });

    res.status(201).json({
      message: "File uploaded successfully",
      file: savedFile,
    });

  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
});

/* ================================
   GET MY FILES (Protected)
================================= */
router.get("/", auth, async (req, res) => {
  try {
    const files = await File.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch files", error: error.message });
  }
});

/* ================================
   GET PUBLIC FILES
================================= */
router.get("/public", async (req, res) => {
  try {
    const files = await File.find({ privacy: "public" }).sort({ createdAt: -1 });
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch public files", error: error.message });
  }
});

/* ================================
   DOWNLOAD FILE (Protected)
================================= */
router.get("/download/:id", auth, async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) return res.status(404).json({ message: "File not found" });

    // Private files = only owner can download
    if (file.privacy === "private" && file.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    return res.download(path.resolve(file.path), file.filename);

  } catch (error) {
    console.error("Download error:", error);
    res.status(500).json({ message: "Download failed", error: error.message });
  }
});

/* ================================
   DELETE FILE (Protected)
================================= */
router.delete("/:id", auth, async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) return res.status(404).json({ message: "File not found" });

    if (file.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    fs.unlink(file.path, () => {});  // delete file from disk
    await file.deleteOne();          // delete from DB

    res.json({ message: "File deleted successfully" });

  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
});

module.exports = router;