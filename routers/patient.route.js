const express = require("express");
const {
  getAllPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient,
  getPatientsBySearch,
} = require("../controllers/patient.controller");
const router = express.Router();

router.get("/", getAllPatients);
router.get("/search", getPatientsBySearch);
router.get("/patients/:patient_id", getPatient);
router.post("/new", createPatient);
router.put("/:patient_id", updatePatient); 
router.delete("/:patient_id", deletePatient); 

module.exports = router;
