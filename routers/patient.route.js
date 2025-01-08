const express = require("express");
const {
  getAllPatients,
  getPatient,
  createPatient,
} = require("../controllers/patient.controller");
const router = express.Router();

router.get("/", getAllPatients);
router.get("/patients/:patient_id", getPatient);
router.post("/", createPatient);

module.exports = router;
