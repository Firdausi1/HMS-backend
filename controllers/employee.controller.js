const employeeModel = require("../models/employee.model");
const bcrypt = require("bcryptjs");

const getEmployees = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const employees = await employeeModel.find().skip(skip).limit(limit);
    if (!employees)
      return res
        .status(404)
        .send({ success: false, message: "No Employee record found" });

    const totalEmployees = await employeeModel.countDocuments();

    res.status(200).send({
      success: true,
      message: "Employees fetched successfully",
      data: employees,
      pagination: {
        total: totalEmployees,
        currentPage: page,
        totalPages: Math.ceil(totalEmployees / limit),
        hasNextPage: page * limit < totalEmployees,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await employeeModel.findById(id);
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
      profile_image: req.body.profile_image,
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
          profile_image: resp.profile_image,
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
          lastName: employee.lastName,
          email: employee.email,
          username: employee.username,
          specialization: employee.specialization,
          phone: employee.phone,
          address: employee.address,
          departmentId: employee.departmentId,
          role: employee.role,
          profile_image: employee.profile_image,
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
      message: "Could not delete employee record",
      error: err.message,
    });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      specialization,
      departmentId,
      profile_image,
    } = req.body;
    const updatedEmployee = await employeeModel.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        email,
        phone,
        address,
        specialization,
        departmentId,
        profile_image,
      },
      { new: true }
    );
    if (!updatedEmployee) {
      res.send({ type: "error", message: "Invalid employee id" });
      return;
    }
    res.send({ type: "success", status_code: 200, data: updatedEmployee });
  } catch (err) {
    res.send({
      type: "error",
      message: "Could not update employee",
      error: err.message,
    });
  }
};

const updatePassword = async (req, res) => {
  const id = req.params.id;
  try {
    const employee = await employeeModel.findById(id);
    const compare_password = await bcrypt.compare(
      req.body.oldPassword,
      employee.password
    );

    if (!compare_password) {
      res.send({ type: "error", message: "Invalid Old Password" });
      return;
    }
    const encrypt_password = await bcrypt.hash(req.body.newPassword, 12);
    await employeeModel.findByIdAndUpdate(
      id,
      {
        password: encrypt_password,
      },
      { new: true }
    );
    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    res.send({
      type: "error",
      message: "Could not update password",
      error: err.message,
    });
  }
};

module.exports = {
  getEmployee,
  getEmployees,
  createEmployee,
  deleteEmployee,
  updateEmployee,
  loginEmployee,
  updatePassword,
};
