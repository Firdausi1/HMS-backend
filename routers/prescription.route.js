const express = require("express");
const {
  createPrescription,
  getPatientPrescriptions,
  getAllPrescriptions,
  
} = require("../controllers/prescription.controller");
const router = express.Router();

router.post("/create", createPrescription);
router.get("/getPrescription", getPatientPrescriptions);
router.get('/prescriptions', getAllPrescriptions);


module.exports = router;