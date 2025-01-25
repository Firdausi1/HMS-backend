const express = require("express");
const {
  getAllPharmacists,
} = require("../controllers/pharmacist.controller");
const router = express.Router();

router.get("/", getAllPharmacists);

module.exports = router;