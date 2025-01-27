const Prescription = require("../models/prescription.model");
const Medication = require("../models/medication.model");



const createPrescription = async (req, res) => {
    const { patient, medications, notes } = req.body;

    const prescription = new Prescription({
      patient,
      medications,
      notes,
    });
  
    try {
      await prescription.save();
      res.status(200).send({
        message: "Prescription created successfully",
        data: prescription
      });
    } catch (err) {
      console.error(err);
      res.status(400).send({ error: 'Failed to create prescription', details: err.message });
    }
};

// Get Patient's Prescriptions
const getPatientPrescriptions = async (req, res) => {
  try {
    const prescription = await Prescription.find()
      .populate('patient', 'name') // Populate patient name
      // .populate('doctor', 'firstName lastName') // Populate doctor name
      .populate('medications.medication', 'name'); // Populate medication name

    if (!prescription) {
      return res.status(404).send({ error: 'Prescription not found' });
    }

    res.status(200).send({
      message: 'Prescription fetched successfully',
      data: prescription,
    });
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: 'Failed to fetch prescription', details: err.message });
  }
};

// update patient prescription
const updatePatientPrescription = async (req, res) => {
  const { id } = req.params;
  const { patient, medications, notes } = req.body;
  try {
    const prescription = await Prescription.findByIdAndUpdate(id, { patient, medications, notes }, { new: true });
    if (!prescription) return res.status(404).send({ error: 'Prescription not found' });
    res.status(200).send({ message: 'Prescription updated successfully', data: prescription });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to update prescription",
      error: error.message
    });
  }
};




module.exports = {createPrescription, getPatientPrescriptions, updatePatientPrescription};