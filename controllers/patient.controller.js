const Patient = require("../models/patient.model");

const getPatient = async (req, res) => {
  try {
    const { patient_id } = req.query;
    const patient = await Patient.findById(patient_id);
    if (!patient) {
      return res.status(401).json({ message: "Invalid patient id" });
    }
    res.status(200).json(patient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getPatient };