const express = require("express");
const {
  getAllReceptionist,
} = require("../controllers/receptionist.controller");

const router = express.Router();

router.get("/", getAllReceptionist);

module.exports = router;
