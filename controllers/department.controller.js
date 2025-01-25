const departmentModel = require("../models/department.model");

const createDepartment = async (req, res) => {
  try {
    const department = await departmentModel.create(req.body);

    if (department) {
      await department.save();
      res.status(200).json(department);
    } else {
      res.status(401).json({ message: "couldn't create department" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getDepartments = async (req, res) => {
  try {
    const departments = await departmentModel.find();
    if (!departments)
      return res
        .status(404)
        .send({ success: false, message: "No Department found" });

    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};
const getDepartment = async (req, res) => {
  try {
    const { department_id } = req.params;
    const department = await departmentModel.findById(department_id);
    if (!department)
      return res
        .status(404)
        .send({ success: false, message: "Invalid patient id" });

    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};
const updateDepartment = async (req, res) => {
  try {
    const { department_id } = req.params;
    const updatedData = req.body;

    const department = await departmentModel.findByIdAndUpdate(
      department_id,
      updatedData,
      {
        new: true,
      }
    );

    if (!department) {
      return res.status(404).json({ message: "record not found" });
    }

    res
      .status(200)
      .json({ message: "Record updated successfully", department });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const { department_id } = req.params;
    const department = await departmentModel.findByIdAndDelete(department_id);
    if (!department) {
      res.send({
        status_code: 400,
        message: "Department doesn't exists",
      });
      return;
    }
    res.send({
      type: "success",
      status_code: 200,
      message: "Department Deleted Successfully",
    });
  } catch (err) {
    res.send({
      type: "error",
      message: "Could not delete Department record",
      error: err.message,
    });
  }
};

module.exports = {
  createDepartment,
  updateDepartment,
  getDepartment,
  getDepartments,
  deleteDepartment,
};
