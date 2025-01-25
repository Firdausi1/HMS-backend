const patientModel = require("../models/patient.model");
const nurseModel = require("../models/nurseModel");
const vitalsModel = require("../models/vitalsModel");

// creating api to record patient's vital signs
const addVitals = async (req, res) => {
  try {
    const { patientId, temperature, bloodPressure, heartRate, respiratoryRate, oxygenSaturation, notes } = req.body;

  
    // check if patient exists
    const patient = await patientModel.findById(patientId);
    if (!patient) return res.status(404).send({ message: "Patient not found"});

    // check if nurse exists
    // const nurse = await nurseModel.findById(nurseId);
    // if (!nurse) return res.status(404).send({ message: "Nurse not found"});

    // create a new patient vitals record
    const newVitals = new vitalsModel({
      patient: patient._id,
      // nurse: nurse._id,
      temperature,
      bloodPressure,
      heartRate,
      respiratoryRate,
      oxygenSaturation,
      notes,
    });

    // save to the database
    const savedVitals = await newVitals.save();
    res.status(200).send({
      success: true,
      message: "Vital signs recorded successfully",
      data: savedVitals
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in adding patient's vital signs",
      error: error.message
    });
  }
};

// creating api to get all vitals for all patients
const getAllVitals = async (req, res) => {
  try {
    const vitals = await vitalsModel.find()
    .populate("patient", "name")
    .populate("nurse", "full_name")
    .lean();
    res.status(200).send({
      success: true,
      message: "All patient's vital signs retrieved successfully",
      data: vitals
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in fetching all patient's vital signs",
      error: error.message
    });
  }
};

// creating api to get vitals for a single patient
const getVitalsByPatientId = async (req, res) => {
  try {
    const { id } = req.params;
    const vitals = await vitalsModel.find({ patient: id })
    .populate("patient", "name")
    .populate("nurse", "full_name")
    .lean();

    if (!vitals || vitals.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No vital signs found for the patient",
      });
    }
    res.status(200).send({
      success: true,
      message: "Vital signs for the patient retrieved successfully",
      data: vitals
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in fetching patient's vital signs",
      error: error.message
    });
  }
};

// creating api to update patient's vital signs
const updateVitals = async (req, res) => {
  try {
    const { id } = req.params;
    const vitalData  = req.body;
    const updatedVitals = await vitalsModel.findByIdAndUpdate(id, vitalData, 
      { new: true,
        runValidators: true 
       })
       .populate("patient", "name")
       .populate("nurse", "full_name");
    if (!updatedVitals) return res.status(404).send({ success: false, message: "Vital signs not found" });
    res.status(200).send({
      success: true,
      message: "Patient's vital signs updated successfully",
      data: updatedVitals
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in updating patient's vital signs",
      error: error.message
    });
  }
};

// creating api to delete patient's vital signs
const deleteVitals = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVitals = await vitalsModel.findByIdAndDelete(id);
    if (!deletedVitals) return res.status(404).send({ success: false, message: "Vital record not found" });
    res.status(200).send({
      success: true,
      message: "Patient's vital signs deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in deleting patient's vital signs",
      error: error.message
    });
  }
};
module.exports = { addVitals, getAllVitals, getVitalsByPatientId, updateVitals, deleteVitals };