const Patient = require("../models/patient.model");

const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    if (!patients) {
      return res.status(401).json({ message: "No Patients record found" });
    }
    res.status(200).json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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

const createPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);

    if (patient) {
      await patient.save();
      res.status(200).json(patient);
    } else {
      res.status(401).json({ message: "couldn't create patient" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllPatients, getPatient, createPatient };
