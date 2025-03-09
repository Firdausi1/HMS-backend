const express = require("express");
const {
  createPrescription,
  getPatientPrescriptions,
  getSinglePrescription,
  updatePatientPrescription,
  
} = require("../controllers/prescription.controller");
const router = express.Router();

router.post("/create", createPrescription);
router.get("/getPrescription", getPatientPrescriptions);
router.get("/patientPrescriptions/:id", getSinglePrescription);
router.put("/update/:id", updatePatientPrescription);




module.exports = router;