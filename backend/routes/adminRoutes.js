const router = require("express").Router();
const { protect } = require("../middleware/auth");
const role = require("../middleware/roleMiddleware");
const { stats, getUsers } = require("../controllers/adminController");

router.get("/stats", protect, role("admin"), stats);
router.get("/users", protect, role("admin"), getUsers);

module.exports = router;
