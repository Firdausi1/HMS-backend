const patientModel = require("../models/patient.model");
const nurseModel = require("../models/nurseModel");
const bedAllotmentModel = require("../models/bedAllotmentModel");

// creating api to add bed allotment
const addBedAllotment = async (req, res) => {
  try {
    const { patientId, nurseId, bedNumber, ward, allotmentDate, dischargeDate, status, notes } = req.body;

    // find the patient and nurse by their ids
    const patient = await patientModel.findById(patientId);
    const nurse = await nurseModel.findById(nurseId);

    if(!patient || !nurse) {
      return res.status(404).send({ 
        success: false,
        message: "Patient or Nurse not found",
      });
    }

    // create a new bed allotment
    const newBedAllotment = new bedAllotmentModel({
      patient: patient._id,
      nurse: nurse._id,
      bedNumber,
      ward,
      allotmentDate,
      dischargeDate,
      status,
      notes,
    });
    // save the new bed allotment
    const savedBedAllotment = await newBedAllotment.save();
    // return the saved bed allotment
    res.status(201).send({
      success: true,
      message: "Bed Allotment added successfully",
      data: savedBedAllotment
    });
  } catch (error) {
    res.status(500).send({ 
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

// creating api to get all bed allotments
const getAllBedAllotments = async (req, res) => {
  try {
    const bedAllotments = await bedAllotmentModel.find()
    .populate("patient", "name")
    .populate("nurse", "full_name")
    .lean();
    res.status(200).send({
      success: true,
      message: "Bed Allotments retrieved successfully",
      data: bedAllotments
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

// creating api to get bed allotment by patient id
const getBedAllotmentByPatientId = async (req, res) => {
  try {
    const { id } = req.params;
    const bedAllotment = await bedAllotmentModel.findOne({ patient: id })
    .populate("patient", "name")
    .populate("nurse", "full_name")
    .lean();

    if (!bedAllotment) return res.status(404).send({
      success: false,
      message: "Bed Allotment not found for this patient",
    });

    res.status(200).send({
      success: true,
      message: "Bed Allotment retrieved successfully",
      data: bedAllotment
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

// creating api update bed allotment (e.g discharge patient or update bed)
const updateBedAllotment = async (req, res) => {
  try {
    const { id } = req.params;
    const bedAllotmentData = req.body;
    const updatedBedAllotment = await bedAllotmentModel.findByIdAndUpdate(
      id, 
      bedAllotmentData, 
      { new: true })
    .populate("patient", "name")
    .populate("nurse", "full_name");

    if (!updatedBedAllotment) return res.status(404).send({ success: false, message: "Bed Allotment not found" });
    res.status(200).send({ 
      success: true, 
      message: "Bed Allotment updated",
      data: updatedBedAllotment,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

// creating api to delete bed allotment (e.g discharge patient)
const deleteBedAllotment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBedAllotment = await bedAllotmentModel.findByIdAndDelete(id);

    if (!deletedBedAllotment) return res.status(404).send({ success: false, message: "Bed Allotment not found" });
    res.status(200).send({ 
      success: true, 
      message: "Bed Allotment deleted"
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

module.exports = { addBedAllotment, getAllBedAllotments, getBedAllotmentByPatientId,  updateBedAllotment, deleteBedAllotment };


 