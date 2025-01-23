const express = require("express");
const {
  getAccountants,
} = require("../controllers/accountant.controller");
const router = express.Router();

router.get("/", getAccountants);

module.exports = router;