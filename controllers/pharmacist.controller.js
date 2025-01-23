const pharmacistModel = require("../models/pharmacistModel");
const bcryptjs = require("bcryptjs");

// creating api to register a pharmacist
const registerPharmacist = async (req, res) => {
  try {
    const encrypt_password = await bcryptjs.hash(req.body.password, 10);
    const new_pharmacist = { ...req.body, password: encrypt_password };
    const create_pharmacist = await pharmacistModel.create(new_pharmacist);
    const resp = await create_pharmacist.save();
    const pharmacist_data = {
      id: resp._id,
      name: resp.name,
      email: resp.email,
      address: resp.address,
      phone: resp.phone,
      appointment_date: resp.appointment_date,
      profile_image: resp.profile_image,
    };
    res.status(200).send({
      success: true,
      message: "Pharmacist registered successfully",
      data: pharmacist_data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

// creating api to get all pharmacists
const getAllPharmacists = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    // fetch pharmacists with pagination
    const pharmacists = await pharmacistModel.find().skip(skip).limit(limit);

    // Total count for pagination metadata
    const totalPharmacists = await pharmacistModel.countDocuments();

    res.status(200).send({
      success: true,
      message: "Pharmacists fetched successfully",
      data: pharmacists,
      pagination: {
        total: totalPharmacists,
        currentPage: page,
        totalPages: Math.ceil(totalPharmacists / limit),
        hasNextPage: page * limit < totalPharmacists,
        hasPrevPage: page > 1,
      }
    }); 
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

// creating api to get single pharmacist by id
const getPharmacistById = async (req, res) => {
  try {
    const id = req.params.id;
    const resp = await pharmacistModel.findById(id);
    if (!resp) return res.status(404).send({ success: false, message: "Pharmacist not found" });
    res.status(200).send({ 
      success: true, 
      message: "Pharmacist fetched successfully",
      data: resp
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

// creating api to login pharmacist
const loginPharmacist = async (req, res) => {
  try {
    const { email, password } = req.body;
    const pharmacist = await pharmacistModel.findOne({ email: email });
    if (!pharmacist) return res.status(404).send({ success: false, message: "Pharmacist not found" });
    const isMatch = await bcryptjs.compare(password, pharmacist.password);
    if (!isMatch) return res.status(401).send({ success: false, message: "Invalid password" });

    const pharmacist_data = {
      id: pharmacist._id,
      name: pharmacist.name,
      email: pharmacist.email,
      address: pharmacist.address,
      phone: pharmacist.phone,
      appointment_date: pharmacist.appointment_date,
      profile_image: pharmacist.profile_image,
    }
    res.status(200).send({
      success: true,
      message: "Pharmacist logged in successfully",
      data: pharmacist_data
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

// creating api to update pharmacist details
const updatePharmacist = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      address,
      phone,
      appointment_date,
      password
    } = req.body;

    // hash the new password if provided 
    if (password) {
      hashedPassword = await bcryptjs.hash(password, 10);
    }

    // update pharmacist details
    const updatedPharmacist = await pharmacistModel.findByIdAndUpdate(id, 
      {
        name,
        email,
        address,
        phone,
        appointment_date,
        password: hashedPassword
    },
    { new: true, runValidators: true }
  );
  
  if (!updatedPharmacist) return res.status(404).send({ success: false, message: "Pharmacist not found" });
  res.status(200).send({
    success: true,
    message: "Pharmacist details updated successfully",
    data: updatedPharmacist
  });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

// creating api to delete pharmacist 
const deletePharmacist = async (req, res) => {
  try {
    const { id } = req.params;
    await pharmacistModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Pharmacist deleted successfully"
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

module.exports = {
  registerPharmacist,
  getAllPharmacists,
  getPharmacistById,
  loginPharmacist,
  updatePharmacist,
  deletePharmacist,
};
