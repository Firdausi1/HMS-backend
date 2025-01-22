const express = require("express");
const {
  registerNurse,
  loginNurse,
  getAllNurses,
  getNurse,
  updateNurse,
  deleteNurse,
} = require("../controllers/nurse.controller");

const router = express.Router();

router.post("/register", registerNurse);
router.post("/login", loginNurse);
router.get("/", getAllNurses);
router.get("/:id", getNurse);
router.put("/:id", updateNurse);
router.delete("/:id", deleteNurse);

module.exports = router;
