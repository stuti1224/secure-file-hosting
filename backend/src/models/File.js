const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  path: { type: String, required: true },
  size: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  privacy: { type: String, enum: ["public", "private"], default: "private" },
}, { timestamps: true });

module.exports = mongoose.model("File", FileSchema);
