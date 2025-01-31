const Medication = require("../models/medication.model");

// Add Medication
const addMedication = async (req, res) => {
  const { name, quantity, price, status, description } = req.body;

  // create a new medication object
  const medication = new Medication({
    name,
    quantity,
    price,
    status,
    description,
  });

  try {
    await medication.save();
    res.status(201).send({
      success: true,
      message: "Medication added successfully",
      data: medication,
    });
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .send({ error: "Failed to add medication", details: err.message });
  }
};

// Get All Medications
// const getAllMedications = async (req, res) => {
//   try {
//     const medications = await Medication.find();
//     res.status(200).send({
//       success: true,
//       message: "Medications retrieved successfully",
//       data: medications });
//   } catch (err) {
//     res.status(400).send(err);
//   }
// };
// Get All Medications (with optional search)
const getAllMedications = async (req, res) => {
  try {
    const { search } = req.query;
    let filter = {};

    if (search) {
      filter.name = { $regex: search, $options: "i" }; // Case-insensitive search
    }

    const medications = await Medication.find(filter);
    res.status(200).send({
      success: true,
      message: "Medications retrieved successfully",
      data: medications,
    });
  } catch (err) {
    res
      .status(400)
      .send({
        success: false,
        message: "Error fetching medications",
        error: err,
      });
  }
};

// creating api to update medication
const updateMedication = async (req, res) => {
  try {
    const { id } = req.params;
    const updateMedicine = await Medication.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updateMedicine)
      return res
        .status(404)
        .send({ success: false, message: "Medication not found" });
    res.status(200).send({
      success: true,
      message: "Medication updated successfully",
      data: updateMedicine,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to update medication",
      error: error.message,
    });
  }
};

// Delete Medication
const DeleteMedication = async (req, res) => {
  try {
    await Medication.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Medication deleted successfully",
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = {
  addMedication,
  getAllMedications,
  updateMedication,
  DeleteMedication,
};
