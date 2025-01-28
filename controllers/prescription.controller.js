const Prescription = require("../models/prescription.model");
const Medication = require("../models/medication.model");



const createPrescription = async (req, res) => {
    const { patientId, medications } = req.body;

    const prescription = new Prescription({
      patientId,
      doctorId: req.user._id,
      medications,
    });
  
    try {
      await prescription.save();
      res.send('Prescription created successfully');
    } catch (err) {
      console.error(err);
      res.status(400).send({ error: 'Failed to create prescription', details: err.message });
    }
};

// Get a specific Patient's Prescription
const getPatientPrescription = async (req, res) => {
    const { prescriptionId } = req.params; // Expecting prescriptionId in the request parameters
    try {
        const prescription = await Prescription.findById(prescriptionId)
            .populate("patientId", "name email") // Optionally populate patient details
            .populate("doctorId", "firstName lastName"); // Optionally populate doctor details

        if (!prescription) {
            return res.status(404).send({ error: 'Prescription not found' });
        }

        res.json(prescription);
    } catch (err) {
        console.error(err);
        res.status(400).send({ error: 'Failed to retrieve prescription', details: err.message });
    }
};

// Get all Prescriptions
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

// Update a Prescription
const updatePrescription = async (req, res) => {
  const { prescriptionId } = req.params; // Expecting prescriptionId in the request parameters
  const updates = req.body; // Get the updates from the request body

  try {
      const prescription = await Prescription.findByIdAndUpdate(prescriptionId, updates, { new: true, runValidators: true })
          .populate("patientId", "name email") // Optionally populate patient details
          .populate("doctorId", "firstName lastName"); // Optionally populate doctor details

      if (!prescription) {
          return res.status(404).send({ error: 'Prescription not found' });
      }

      res.json({
          message: "Prescription updated successfully",
          data: prescription,
      });
  } catch (err) {
      console.error(err);
      res.status(400).send({ error: 'Failed to update prescription', details: err.message });
  }
};

// Delete a Prescription
const deletePrescription = async (req, res) => {
    const { prescriptionId } = req.params; // Expecting prescriptionId in the request parameters
    try {
        await Prescription.findByIdAndDelete(prescriptionId);
        res.json({ message: "Prescription deleted successfully" });
    } catch (err) {
        res.status(400).send({ error: 'Failed to delete prescription', details: err.message });
    }
};

module.exports = {createPrescription, getAllPrescriptions, getPatientPrescription, updatePrescription, deletePrescription};