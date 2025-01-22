const express = require("express");
const router = express.Router();
const {
  createAppointment,
  getAppointments,
  deleteAppointment,
} = require("../controllers/appointment.controller");

router.post("/new", createAppointment); // Create an appointment
router.get("/", getAppointments);    // Get all appointments
router.delete("/:id", deleteAppointment); // Delete an appointment

module.exports = router;
