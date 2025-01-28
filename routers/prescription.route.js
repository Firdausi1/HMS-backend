const express = require("express");
const {
  createPrescription,
  getPatientPrescription,
  getAllPrescriptions,
  updatePrescription,
  deletePrescription,
  
} = require("../controllers/prescription.controller");
const router = express.Router();

router.post("/create", createPrescription);
router.get("/getPrescription", getPatientPrescription);
router.get('/prescriptions', getAllPrescriptions);
router.put("/update", updatePrescription);
router.delete("/delete", deletePrescription);


module.exports = router;