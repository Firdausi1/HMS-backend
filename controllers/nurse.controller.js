const employeeModel = require("../models/employee.model");

const getAllNurses = async (req, res) => {
  try {
    const nurses = await employeeModel.find({ role: "Nurse" });
    if (!nurses)
      return res
        .status(404)
        .send({ success: false, message: "No Nurse record found" });

    res.status(200).json(nurses);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = {
  getAllNurses,
};
