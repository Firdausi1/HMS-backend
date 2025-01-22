const receptionistModel = require("../models/receptionist.model");
const bcryptjs = require("bcryptjs");

const registerReceptionist = async (req, res) => {
  try {
    const encrypt_password = await bcryptjs.hash(req.body.password, 12);
    const new_receptionist = { ...req.body, password: encrypt_password };
    const create_receptionist = new receptionistModel(new_receptionist);
    const resp = await create_receptionist.save();
    const receptionist_data = { id: resp._id, first_name: resp.first_name, last_name: resp.last_name, email: resp.email, password: resp.password, date: resp.date, hospital_Id: resp.hospital_Id, phone: resp.phone, address: resp.address };

    res.status(200).send({ success: true, msg: "Receptionist Created", data: receptionist_data });
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "There was an error creating a Receptionist",
      error: error.message,
    });
  }
};

const loginReceptionist = async (req, res) => {
  try {
    const { email, password } = req.body;
    const find_receptionist = await receptionistModel.findOne({ email: email });
    if (!find_receptionist) return res.status(404).send({ success: false, msg: "Receptionist Not Found" });
    const check_password = await bcryptjs.compare(password, find_receptionist.password);
    if (!check_password) return res.status(401).send({ success: false, msg: "Invalid Credentials" });
    const receptionist_data = {
      id: find_receptionist._id,
      first_name: find_receptionist.first_name,
      last_name: find_receptionist.last_name,
      email: find_receptionist.email,
      password: find_receptionist.password,
    };
    res.status(200).send({ success: true, msg: "Login Successful", data: receptionist_data });
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Login Unsuccessful",
      error: error.message,
    });
  }
};

const getAllReceptionist = async (req, res) => {
  try {
    const receptionists = await receptionistModel.find();
    if (!receptionists) {
      return res.status(401).json({ message: "No Receptionist record found" });
    }
    res.status(200).json(receptionists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// Edit (Update) a receptionist

const editReceptionist = async (req, res) => {
  try {
    const { receptionist_id } = req.params; // ID of the receptionist from route parameters
    const {
      oldPassword,
      newPassword,
      confirmPassword,
      first_name,
      last_name,
      email,
      phone,
      address,
    } = req.body; // Extract fields from the request body

    // Find the receptionist by ID
    const receptionist = await receptionistModel.findById(receptionist_id);
    if (!receptionist) {
      return res.status(404).json({ success: false, msg: "Receptionist not found" });
    }

    const updatedData = {};

    // Update name, email, phone, and address if provided
    if (first_name) updatedData.first_name = first_name;
    if (last_name) updatedData.last_name = last_name;
    if (email) updatedData.email = email;
    if (phone) updatedData.phone = phone;
    if (address) updatedData.address = address;

    // Validate old password if new password is provided
    if (newPassword) {
      const isOldPasswordCorrect = await bcryptjs.compare(oldPassword, receptionist.password);
      if (!isOldPasswordCorrect) {
        return res.status(400).json({ success: false, msg: "Old password is incorrect" });
      }

      // Ensure new password and confirm password match
      if (newPassword !== confirmPassword) {
        return res.status(400).json({ success: false, msg: "New password and confirm password do not match" });
      }

      // Hash the new password
      updatedData.password = await bcryptjs.hash(newPassword, 12);
    }

    // Update the receptionist details
    const updatedReceptionist = await receptionistModel.findByIdAndUpdate(
      receptionist_id,
      updatedData,
      { new: true } // Return the updated document
    );

    if (!updatedReceptionist) {
      return res.status(404).json({ success: false, msg: "Receptionist not found" });
    }

    res.status(200).json({
      success: true,
      msg: "Receptionist updated successfully",
      data: updatedReceptionist,
    });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
};



// Delete a receptionist
const deleteReceptionist = async (req, res) => {
  try {
    const { receptionist_id } = req.params; // ID of the receptionist from route parameters

    const deletedReceptionist = await receptionistModel.findByIdAndDelete(receptionist_id);

    if (!deletedReceptionist) {
      return res.status(404).json({ success: false, msg: "Receptionist not found" });
    }

    res.status(200).json({
      success: true,
      msg: "Receptionist deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
};

module.exports = { registerReceptionist, loginReceptionist, getAllReceptionist, editReceptionist, deleteReceptionist };