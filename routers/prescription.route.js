const express = require("express");
const {
  createPrescription,
  getPatientPrescriptions,
  updatePatientPrescription,
  
} = require("../controllers/prescription.controller");
const router = express.Router();

router.post("/create", createPrescription);
router.get("/getPrescription", getPatientPrescriptions);
router.put("/update/:id", updatePatientPrescription);



module.exports = router;