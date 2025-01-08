const express = require("express");
const { getPatient } = require("../controllers/patient.controller");
const router = express.Router();

router.get("/patients/:patient_id", getPatient);

module.exports = router;
