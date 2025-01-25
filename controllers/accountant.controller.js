const employeeModel = require("../models/employee.model");

const getAccountants = async (req, res) => {
  try {
    const accountants = await employeeModel.find({ role: "Accountant" });
    if (!accountants)
      return res
        .status(404)
        .send({ success: false, message: "No Accountant record found" });

    res.status(200).json(accountants);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAccountants };
