const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("MONGO URI BEING USED:", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("DB connection error:", error);
  }
};

module.exports = connectDB;
