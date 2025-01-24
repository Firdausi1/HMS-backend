const employeeModel = require("../models/employee.model");

const getAllReceptionist = async (req, res) => {
  try {
    const receptionist = await employeeModel.find({ role: "Receptionist" });
    if (!receptionist)
      return res
        .status(404)
        .send({ success: false, message: "No Receptionist record found" });

    res.status(200).json(receptionist);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllReceptionist };
