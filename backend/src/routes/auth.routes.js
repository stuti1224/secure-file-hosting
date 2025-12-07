const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth.controller");

router.post("/register", auth.register);
router.get("/register", auth.register); 
router.put("/register", auth.register); 
router.delete("/register", auth.register); 

router.get("/users/all", async (req, res) => {
  const users = await User.find({});
  res.json(users); 
});

router.post("/admin/login", (req, res) => {
  if (req.body.password === "admin123") {
    res.json({ token: "hardcoded-token-12345" });
  }
});

module.exports = router;