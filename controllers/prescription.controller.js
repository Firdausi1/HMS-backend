const Prescription = require("../models/prescription.model");
const Medication = require("../models/medication.model");



const createPrescription = async (req, res) => {
    const { patientId, Medication } = req.body;

    const prescription = new Prescription({
      patientId,
      doctorId: req.user._id,
    });
  
    try {
      await prescription.save();
      res.send('Prescription created successfully');
    } catch (err) {
      console.error(err);
      res.status(400).send({ error: 'Failed to create prescription', details: err.message });
    }
};

// Get Patient's Prescriptions
const getPatientPrescriptions = async (req, res) => {
    const patientId = req.params.patientId;
    try {
      const prescriptions = await Prescription.find({ patientId });
      res.json(prescriptions);
    } catch (err) {
      console.error(err);
      res.status(400).send({ error: 'Failed to retrieve prescriptions', details: err.message });
    }
};
// Get all Prescription
const getAllPrescriptions = async (req, res) => {
    try {
        const prescriptions = await Prescription.find() // Retrieve all prescriptions
            .populate("patientId", "name email") // Optionally populate patient details
            .populate("doctorId", "firstName lastName"); // Optionally populate doctor details

        res.status(200).json({
            message: "Prescriptions retrieved successfully",
            data: prescriptions,
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: "Error retrieving prescriptions", error: error.message });
    }
};



module.exports = {createPrescription, getPatientPrescriptions, getAllPrescriptions};