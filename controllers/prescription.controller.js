const Prescription = require("../models/prescription.model");



const createPrescription = async (req, res) => {
    const { patientId } = req.body;

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

module.exports = {createPrescription, getPatientPrescriptions};