const express = require("express");
const { protect, allowRoles } = require("../middleware/auth");

const router = express.Router();

router.get("/admin", protect, allowRoles("admin"), (req, res) => {
    res.json({ message: "Welcome Admin Dashboard" });
});

router.get("/user", protect, allowRoles("user", "admin"), (req, res) => {
    res.json({ message: "Welcome User Dashboard" });
});

module.exports = router;
