const express = require("express");
const {
  createAdmin,
  loginAdmin,
  updateAdmin,
  updatePassword,
} = require("../controllers/admin.controller");
const router = express.Router();

router.post("/register", createAdmin);
router.post("/login", loginAdmin);
router.put("/:admin_id", updateAdmin);
router.put("/update_password/:admin_id", updatePassword);

module.exports = router;
