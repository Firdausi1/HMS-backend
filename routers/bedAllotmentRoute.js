const express = require("express");
const {
  addBedAllotment,
  getAllBedAllotments,
  getBedAllotmentByPatientId,
  updateBedAllotment,
  deleteBedAllotment,
} = require("../controllers/allotment.controller");

const router = express.Router();
router.post("/allot", addBedAllotment);
router.get("/", getAllBedAllotments);
router.get("/patient/:id", getBedAllotmentByPatientId);
router.put("/:id", updateBedAllotment);
router.delete("/:id", deleteBedAllotment);

module.exports = router;
