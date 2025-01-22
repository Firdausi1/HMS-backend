const express = require("express");
const router = express.Router();
const {
  addVitals,
  getAllVitals,
  getVitalsByPatientId,
  updateVitals,
  deleteVitals,
} = require("../controllers/vitals.controller");

router.post("/add_vitals", addVitals);
router.get("/", getAllVitals);
router.get("/:id", getVitalsByPatientId);
router.put("/:id", updateVitals);
router.delete("/:id", deleteVitals);

module.exports = router;