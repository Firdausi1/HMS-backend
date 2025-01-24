const adminModel = require("../models/admin.model");
const bcrypt = require("bcryptjs");

const createAdmin = async (req, res) => {
  try {
    const encrypt_password = await bcrypt.hash(req.body.password, 12);
    const admin = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      password: encrypt_password,
      address: req.body.address,
    };
    const newAdmin = await adminModel.create(admin);

    if (newAdmin) {
      await newAdmin.save();
      res.status(200).json({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
      });
    } else {
      res.status(401).json({ message: "couldn't create admin" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const find_admin = await adminModel.findOne({ email: email });
    if (!find_admin)
      return res
        .status(404)
        .send({ success: false, message: "Admin not found" });

    const compare_password = await bcrypt.compare(
      password,
      find_admin.password
    );
    if (!compare_password)
      return res.status(401).send({
        success: false,
        message: "Invalid password",
      });

    const admin = {
      id: find_admin._id,
      firstName: find_admin.firstName,
      lastName: find_admin.lastName,
      email: find_admin.email,
      address: find_admin.address,
      phone: find_admin.phone,
    };
    res.status(200).send({
      success: true,
      message: "logged in successfully",
      data: admin,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in logging in",
      error: error.message,
    });
  }
};
const updateAdmin = async (req, res) => {
  try {
    const { admin_id } = req.params;
    const updatedData = req.body;

    const admin = await adminModel.findByIdAndUpdate(admin_id, updatedData, {
      new: true,
    });

    if (!admin) {
      return res.status(404).json({ message: "record not found" });
    }

    res.status(200).json({ message: "Record updated successfully", admin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updatePassword = async (req, res) => {
  const { admin_id } = req.params;
  try {
    const admin = await adminModel.findById(admin_id);
    const compare_password = await bcrypt.compare(
      req.body.oldPassword,
      admin.password
    );

    if (!compare_password) {
      res.send({ type: "error", message: "Invalid Old Password" });
      return;
    }
    const encrypt_password = await bcrypt.hash(req.body.newPassword, 12);
    await adminModel.findByIdAndUpdate(
      admin_id,
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
  createAdmin,
  updateAdmin,
  loginAdmin,
  updatePassword,
};
