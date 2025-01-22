const express = require("express");
const {
  createPrescription,
  getPatientPrescriptions,
  
} = require("../controllers/prescription.controller");
const router = express.Router();

router.post("/create", createPrescription);
router.get("/getPrescription", getPatientPrescriptions);


module.exports = router;