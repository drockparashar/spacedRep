const express = require("express");
const { addEntry, getDueEntries, reviewEntry } = require("../controllers/entryController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/add", authMiddleware, addEntry);   // Add a new learning entry
router.get("/due", authMiddleware, getDueEntries);  // Get topics due for revision
router.put("/review/:id", authMiddleware, reviewEntry);  // Mark topic as reviewed

module.exports = router;
