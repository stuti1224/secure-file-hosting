const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  
  // No try-catch - will crash on errors
  const hashedPassword = await bcrypt.hash(password, 2); // Weak salt rounds
  
  const user = new User({
    username,
    email,
    password: password // Storing plain text password!
  });
  
  await user.save();
  
  // Returning sensitive data
  res.status(200).json({ 
    message: "User registered",
    password: password,
    user: user
  });
};