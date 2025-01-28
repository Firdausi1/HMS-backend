const appointmentModel = require("../models/appointment.model");
const patientModel = require("../models/patient.model");

// Create new appointment
const createAppointment = async (req, res) => {
  try {
    const { patientId, doctorName, date, time } = req.body; // Added `time`

    // Validate input
    if (!patientId || !doctorName || !date || !time) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if the patient exists and get the patient's name
    const patient = await patientModel.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found." });
    }

    const patientName = patient.name; // Assuming the patient model has a 'name' field

    // Check if there's already an appointment for this doctor at the given time and date
    const existingAppointment = await appointmentModel.findOne({ 
      doctorName, 
      date, 
      time 
    });

    if (existingAppointment) {
      return res.status(400).json({ message: "Appointment already exists at this time for the selected doctor." });
    }


    // Create and save the appointment
    const newAppointment = new appointmentModel({
      patient: patientId,
      patientName,  // Save the patient's name along with the appointment
      doctorName,
      date,
      time, // Added `time` field
    });

    await newAppointment.save();

    res.status(201).json({
      message: "Appointment created successfully.",
      appointment: {
        ...newAppointment.toObject(),
        patientName,  // Ensure patientName is included in the response
      },
    });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ message: "Failed to create appointment." });
  }
};

// Get all appointments
const getAppointments = async (req, res) => {
  try {
    // Fetch appointments and populate patient details
    const appointments = await appointmentModel.find()
      .populate("patient", "name gender age address") // Select specific fields from the Patient model
      .sort({ date: -1 });

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Failed to fetch appointments." });
  }
};

// Get single appointment
const getSingleAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the appointment by ID and populate patient details
    const appointment = await appointmentModel.findById(id)
      .populate("patient", "name gender age address"); // Select specific fields from the Patient model

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }

    res.status(200).json(appointment);
  } catch (error) {
    console.error("Error fetching appointment:", error);
    res.status(500).json({ message: "Failed to fetch appointment." });
  }
};

// Delete appointment
const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the appointment by ID
    const appointment = await appointmentModel.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }

    // Delete the appointment
    await appointment.deleteOne();

    res.status(200).json({ message: "Appointment deleted successfully." });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({ message: "Failed to delete appointment." });
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  getSingleAppointment,
  deleteAppointment,
};
