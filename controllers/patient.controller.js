const patientModel = require("../models/patient.model");
const mongoose = require("mongoose");

const getAllPatients = async (req, res) => {
  try {
    const patients = await patientModel.find();
    if (!patients) {
      return res.status(401).json({ message: "No Patients record found" });
    }
    res.status(200).json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// api to get all patients by name
const getPatientsBySearch = async (req, res) => {
  const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);
  try {
    const { gender, bloodGroup, search } = req.query;
    let filter = {};

    if (gender) filter.gender = gender;
    if (bloodGroup) filter.bloodGroup = bloodGroup;

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } }, // Case-insensitive name search
      ];
      if (isValidObjectId(search)) {
        filter.$or.push({ _id: search }); // Add _id search if it's a valid ObjectId
      }
    }
    const patients = await patientModel.find(filter);
    if (!patients)
      return res.status(401).json({ message: "No Patients record found" });
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPatient = async (req, res) => {
  try {
    const { patient_id } = req.query;
    const patient = await patientModel.findById(patient_id);
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
    const patient = await patientModel.create(req.body);

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

// Update a patient's details
const updatePatient = async (req, res) => {
  try {
    const { patient_id } = req.params; // Patient ID from route parameters
    const updatedData = req.body; // Data to update from request body

    const patient = await patientModel.findByIdAndUpdate(
      patient_id,
      updatedData,
      { new: true } // Return the updated document
    );

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json({ message: "Patient updated successfully", patient });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a patient
const deletePatient = async (req, res) => {
  try {
    const { patient_id } = req.params; // Patient ID from route parameters

    const patient = await patientModel.findByIdAndDelete(patient_id);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = {
  getAllPatients,
  getPatientsBySearch,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient,
};
