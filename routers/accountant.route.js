const express = require("express");
const {
  getAccountant,
  getSingleAccountant,
  AccountantRegister,
  loginAccountant,
  deleteAccountant,
  updateAccountant,
} = require("../controllers/accountant.controller");
const router = express.Router();

router.get("/get", getAccountant);
router.get("/get/:id", getSingleAccountant);
router.post("/register", AccountantRegister);
router.post("/login", loginAccountant);
router.delete("/:id", deleteAccountant);
// router.put("/:id", updateAccountant);

module.exports = router;