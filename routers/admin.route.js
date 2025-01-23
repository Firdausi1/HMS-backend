const express = require("express");
const {
  createAdmin,
  loginAdmin,
  updateAdmin,
} = require("../controllers/admin.controller");
const router = express.Router();

router.post("/register", createAdmin);
router.post("/login", loginAdmin);
router.put("/:admin_id", updateAdmin);

module.exports = router;
