const express = require('express');
const { addBed, getAllBeds, getAvailableBeds, updateBed, deleteBed, getReservedBeds } = require('../controllers/bed.controller');

const router = express.Router();

router.post("/add_beds", addBed);
router.get("/", getAllBeds);
router.get("/available", getAvailableBeds);
router.get("/reserved", getReservedBeds);
router.put("/:id", updateBed);
router.delete("/:id", deleteBed);

module.exports =  router;