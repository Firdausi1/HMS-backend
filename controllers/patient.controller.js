const patientModel = require("../models/patient.model");

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

// const getPatient = async (req, res) => {
//   try {
//     const { patient_id } = req.query;
//     const patient = await patientModel.findById(patient_id);
//     if (!patient) {
//       return res.status(401).json({ message: "Invalid patient id" });
//     }
//     res.status(200).json(patient);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
// api to get all patients by name
const getPatientsBySearch = async (req, res) => {
  try {
    const { name } = req.query;
    let patients;
    if (name) {
      // If a name is provided, search for patients matching the name (case-insensitive)
      patients = await patientModel.find({ name: { $regex: name, $options: "i" } });
    } else {
      // If no name is provided, return all patients
      patients = await patientModel.find();
    }
    if (!patients) return res.status(401).json({ message: "No Patients record found" });
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message : error.message });
  }
};


const getPatient = async (req, res) => {
  try {
    const { patient_id } = req.params; // Assuming you're using params
    const patient = await patientModel.findById(patient_id);
    
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    
    // Return the patient data, including the ID
    res.status(200).json({
      _id: patient._id,
      name: patient.name,
      email: patient.email,
      gender: patient.gender,
      bloodGroup: patient.bloodGroup,
      age: patient.age,
      phone: patient.phone,
      address: patient.address,
      createdAt: patient.createdAt,
      updatedAt: patient.updatedAt,
      // Include any other relevant fields
    });
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
module.exports = { getAllPatients, getPatientsBySearch, getPatient, createPatient ,updatePatient, deletePatient};
