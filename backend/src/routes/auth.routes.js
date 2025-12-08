const express = require("express");
const router = express.Router();

router.get("/register", (req, res) => {
    res.json({ message: "Register route working" });
});

module.exports = router;
