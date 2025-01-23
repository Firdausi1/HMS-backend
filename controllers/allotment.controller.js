const patientModel = require("../models/patient.model");
const nurseModel = require("../models/nurseModel");
const bedAllotmentModel = require("../models/bedAllotmentModel");
const bedModel = require("../models/bedModel");

// creating api to add bed allotment
const addBedAllotment = async (req, res) => {
  try {
    const { patientId, nurseId, bedId, allotmentDate, dischargeDate, status, notes } = req.body;

    // find the patient, nurse and bed
    const patient = await patientModel.findById(patientId);
    const nurse = await nurseModel.findById(nurseId);
    const bed = await bedModel.findById(bedId);

    if(!patient || !nurse || !bed) {
      return res.status(404).send({ 
        success: false,
        message: "Patient, Nurse or Bed not found",
      });
    }

    if (bed.status !== "Available") return res.status(400).send({ success: false, message: "Bed is not available" });

    // create a new bed allotment
    const newBedAllotment = new bedAllotmentModel({
      patient: patient._id,
      nurse: nurse._id,
      bed: bed._id,
      allotmentDate,
      dischargeDate,
      status: "Alloted",
      notes,
    });

    // save the new bed allotment
    const savedBedAllotment = await newBedAllotment.save();
    bed.status = "Occupied";
    await bed.save();
     
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
    .populate("bed", "bedNumber ward")
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
    .populate("bed", "bedNumber ward")
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
// const updateBedAllotment = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const bedAllotmentData = req.body;
//     const updatedBedAllotment = await bedAllotmentModel.findByIdAndUpdate(
//       id, 
//       bedAllotmentData, 
//       { new: true })
//     .populate("patient", "name")
//     .populate("nurse", "full_name");

//     if (!updatedBedAllotment) return res.status(404).send({ success: false, message: "Bed Allotment not found" });

//     // if bed is being chnaged, update bed statuses
//     if (bedId && bedId !== bedAllotment.bed.toString()) {
//       const oldBed = await bedModel.findById(bedAllotment.bed.toString());
//     }
//     res.status(200).send({ 
//       success: true, 
//       message: "Bed Allotment updated",
//       data: updatedBedAllotment,
//     });
//   } catch (error) {
//     res.status(500).send({
//       success: false,
//       message: "Internal Server Error",
//       error: error.message
//     });
//   }
// };
const updateBedAllotment = async (req, res) => {
  try {
    const { id } = req.params;
    const { bedId, ...updateData } = req.body;

    // Find the existing bed allotment
    const bedAllotment = await bedAllotmentModel.findById(id);
    if (!bedAllotment) {
      return res.status(404).send({ success: false, message: "Bed Allotment not found" });
    }

    // If the bedId is being updated, handle bed status changes
    if (bedId && bedId !== bedAllotment.bed.toString()) {
      const oldBed = await bedModel.findById(bedAllotment.bed);
      const newBed = await bedModel.findById(bedId);

      // Check if the new bed exists and is available
      if (!newBed || newBed.status !== "Available") {
        return res.status(400).send({
          success: false,
          message: "New bed is not available or does not exist",
        });
      }

      // Update the statuses of the old and new beds
      if (oldBed) {
        oldBed.status = "Available";
        await oldBed.save();
      }
      newBed.status = "Occupied";
      await newBed.save();

      // Update the bed reference in the allotment
      updateData.bed = bedId;
    }

    // Update the bed allotment with new data
    const updatedBedAllotment = await bedAllotmentModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    )
      .populate("patient", "name")
      .populate("nurse", "full_name")
      .populate("bed", "bedNumber ward");

    res.status(200).send({
      success: true,
      message: "Bed Allotment updated successfully",
      data: updatedBedAllotment,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
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

    // update the bed status to Available
    const bed = await bedModel.findById(deletedBedAllotment.bed);
    if (bed) {
      bed.status = "Available";
      await bed.save();
    }

    res.status(200).send({
      success: true,
      message: "Bed status updated to Available",
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


 