const employeeModel = require("../models/employee.model");
const bcrypt = require("bcryptjs");

const getEmployees = async (req, res) => {
  try {
    const employees = await employeeModel.find();
    if (!employees)
      return res
        .status(404)
        .send({ success: false, message: "No Employee record found" });

    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

const getEmployee = async (req, res) => {
  try {
    const { employee_id } = req.params;
    const employee = await employeeModel.findById(employee_id);
    if (!employee)
      return res
        .status(404)
        .send({ success: false, message: "Invalid employee id" });

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

const createEmployee = async (req, res) => {
  try {
    const employee = await employeeModel.findOne({ email: req.body.email });
    if (employee) {
      res.send({
        type: "error",
        status_code: 401,
        message: "Employee Already Exists",
      });
      return;
    }
    const encrypt_password = await bcrypt.hash(req.body.password, 12);
    const newEmployee = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      username: req.body.username,
      specialization: req.body.specialization,
      phone: req.body.phone,
      password: encrypt_password,
      address: req.body.address,
      departmentId: req.body.departmentId,
      role: req.body.role,
    };
    const create_employee = await employeeModel.create(newEmployee);
    if (create_employee) {
      const resp = await create_employee.save();
      res.send({
        type: "success",
        status_code: 201,
        data: {
          id: resp._id,
          firstName: resp.firstName,
          lastName: resp.lastName,
          email: resp.email,
          username: resp.username,
          specialization: resp.specialization,
          phone: resp.phone,
          address: resp.address,
          departmentId: resp.departmentId,
          role: resp.role,
        },
      });
    } else {
      res.status(401).json({ message: "couldn't create Employee" });
    }
  } catch (err) {
    res.send({
      type: "error",
      message: "could not create Employee",
      error: err.message,
    });
  }
};

const loginEmployee = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (email && password) {
      const employee = await employeeModel.findOne({ email: email });
      if (!employee) {
        res.send({ type: "error", message: "Employee Not Found" });
        return;
      }
      const compare_password = await bcrypt.compare(
        password,
        employee.password
      );
      if (!compare_password) {
        res.send({ type: "error", message: "Invalid email or Password" });
        return;
      }
      res.send({
        type: "success",
        message: "Employee Login Successful",
        data: {
          id: employee._id,
          firstName: employee.firstName,
          email: employee.email,
          role: employee.role,
        },
      });
    } else {
      res.send({ type: "error", message: "Invalid Credentials" });
    }
  } catch (err) {
    res.send({
      type: "error",
      message: "Could not Login Doctor",
      error: err.message,
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    await employeeModel.findByIdAndDelete(id);
    res.send({
      type: "success",
      status_code: 200,
      message: "Employee Deleted Successfully",
    });
  } catch (err) {
    res.send({
      type: "error",
      message: "Could not employee Doctor",
      error: err.message,
    });
  }
};

const updateEmployee = async (req, res) => {
  const id = req.params.id;
  const { name, email, phone, address, specialization, departmentId } =
    req.body;
  const updatedEmployee = await employeeModel.findByIdAndUpdate(
    id,
    { name, email, phone, address, specialization, departmentId },
    { new: true }
  );
  res.send({ type: "success", status_code: 200, data: updatedEmployee });
};

module.exports = {
  getEmployee,
  getEmployees,
  createEmployee,
  deleteEmployee,
  updateEmployee,
  loginEmployee,
};
