const express = require("express");
const {
  
  getDoctor,
} = require("../controllers/doctor.controller");
const router = express.Router();

router.get("/", getDoctor);

module.exports = router;
