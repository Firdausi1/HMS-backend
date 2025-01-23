const bedModel = require("../models/bedModel");

// creating api to add a bed
const addBed = async (req, res) => {
  try {
    const { bedNumber, ward, status, notes } = req.body;

    // check if bed already exists
    const existingBed = await bedModel.findOne({ bedNumber, ward });
    if (existingBed) {
      return res.status(400).send({ 
        success: false,
        message: "Bed already exists" 
      });
    }

    // create a new bed
    const newBed = await bedModel.create({ 
      bedNumber, 
      ward,
      status,
      notes,
    });

    // save the bed
    const savedBed = await newBed.save();

    res.status(201).send({
      success: true,
      message: "Bed added successfully",
      data: savedBed
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in adding bed",
      error: error.message,
    });
  }
};

// creating api to get all beds
const getAllBeds = async (req, res) => {
  try {
    const beds = await bedModel.find();
    res.status(200).send({
      success: true,
      message: "Beds retrieved successfully",
      data: beds
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in retrieving beds",
      error: error.message,
    });
  }
};

// creating api to get available beds
const getAvailableBeds = async (req, res) => {
  try {
    const availableBeds = await bedModel.find({ status: "Available" });
    res.status(200).send({
      success: true,
      message: "Available beds retrieved successfully",
      data: availableBeds
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in retrieving available beds",
      error: error.message,
    });
  }
};

// creating api to get all reserved beds
const getReservedBeds = async (req, res) => {
  try {
    const reservedBeds = await bedModel.find({ status: "Reserved" });
    res.status(200).send({
      success: true,
      message: "Reserved beds retrieved successfully",
      data: reservedBeds
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in retrieving reserved beds",
      error: error.message,
    });
  }
};

// creating api to update bed status or details
const updateBed = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedBed = await bedModel.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedBed) return res.status(404).send({ success: false, message: "Bed not found" });
    res.status(200).send({
      success: true,
      message: "Bed updated successfully",
      data: updatedBed,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in updating bed",
      error: error.message,
    });
  }
};

// creating api to delete a bed
const deleteBed = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBed = await bedModel.findByIdAndDelete(id);
    if (!deletedBed) return res.status(404).send({ success: false, message: "Bed not found" });
    res.status(200).send({
      success: true,
      message: "Bed deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in deleting bed",
      error: error.message,
    });
  }
};

module.exports = { addBed, getAllBeds, getAvailableBeds, getReservedBeds, updateBed, deleteBed  }