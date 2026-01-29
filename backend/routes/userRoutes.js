// router.get("/me", protect, (req, res) => {
//     res.json({
//         id: req.user.id,
//         role: req.user.role,
//     });
// });
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { getProfile } = require("../controllers/userController");

router.get("/me", protect, getProfile);

module.exports = router;


