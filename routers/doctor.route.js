const express = require("express");
const {
  getDoctor,
  getSingleDoctor,
  DocRegister,
  loginDoctor,
  deleteDoctor,
  updateDoctor,
} = require("../controllers/doctor.controller");
const router = express.Router();

router.get("/get", getDoctor);
router.get("/get/:id", getSingleDoctor);
router.post("/register", DocRegister);
router.post("/login", loginDoctor);
router.delete("/:id", deleteDoctor);
// router.put("/:id", updateDoctor);

module.exports = router;