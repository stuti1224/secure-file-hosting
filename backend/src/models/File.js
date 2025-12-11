// backend/src/models/File.js
const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true }, // original file name
    path: { type: String, required: true },     // path on disk (uploads/...)
    size: { type: Number, required: true },     // file size in bytes

    // NEW: public / private
    privacy: {
      type: String,
      enum: ["public", "private"],
      default: "private",
    },

    // who owns the file
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("File", fileSchema);
