const express = require("express");
const {
  getDoctors,
} = require("../controllers/doctor.controller");
const router = express.Router();

router.get("/", getDoctors);

module.exports = router;