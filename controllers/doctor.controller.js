const employeeModel = require("../models/employee.model");

const getDoctors = async (req, res) => {
  try {
    const doctors = await employeeModel.find({ role: "Doctor" });
    if (!doctors)
      return res
        .status(404)
        .send({ success: false, message: "No Doctor record found" });

    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getDoctors,
};
