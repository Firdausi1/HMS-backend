const express = require("express");
const { addMedication, getAllMedications, updateMedication, DeleteMedication } = require("../controllers/medication.controller");

const router = express.Router();

router.post("/add_medicine", addMedication);
router.get("/", getAllMedications);
router.put("/update/:id", updateMedication);
router.delete("/delete/:id", DeleteMedication);

module.exports = router;