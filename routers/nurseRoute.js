const express = require("express");
const {
  getAllNurses,
} = require("../controllers/nurse.controller");

const router = express.Router();

router.get("/", getAllNurses);

module.exports = router;
