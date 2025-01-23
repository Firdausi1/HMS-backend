const express = require("express");
const {
  registerPharmacist,
  loginPharmacist,
  getAllPharmacists,
  getPharmacistById,
  updatePharmacist,
  deletePharmacist,
} = require("../controllers/pharmacist.controller");
const router = express.Router();

router.post("/add_pharmacist", registerPharmacist);
router.post("/login", loginPharmacist);
router.get("/", getAllPharmacists);
router.get("/:id", getPharmacistById);
router.put("/update/:id", updatePharmacist);
router.delete("/delete/:id", deletePharmacist);

module.exports = router;