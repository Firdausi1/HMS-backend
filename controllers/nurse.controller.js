const nurseModel = require("../models/nurseModel");
const bcryptjs = require("bcryptjs");

// creating api to register nurse
const registerNurse = async (req, res) => {
  try {
    const encrypt_password = await bcryptjs.hash(req.body.password, 10);
    const new_nurse = { ...req.body, password: encrypt_password };
    const create_nurse = await nurseModel.create(new_nurse);
    const resp = await create_nurse.save();
    const nurse_data = {
      id: resp._id,
      full_name: resp.full_name,
      email: resp.email,
      departmentId: resp.departmentId,
      address: resp.address,
      phone: resp.phone,
      appointment_date: resp.appointment_date,
      profile_image: resp.profile_image,
    };
    res.status(200).send({
      success: true,
      message: "Nurse registered successfully",
      data: nurse_data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in registering nurse",
      error: error.message,
    });
  }
};

// // creating api to get all nurses
// const getAllNurses = async (req, res) => {
//   try {
//     const resp = await nurseModel.find();
//     res.status(200).send({
//       success: true,
//       message: "Nurses retrieved successfully",
//       data: resp,
//     });
//   } catch (error) {
//     res.status(500).send({
//       success: false,
//       message: "Error in getting all nurses",
//       error: error.message,
//     });
//   }
// };

// creating api to get all nurses with pagination
const getAllNurses = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit, 10) || 10; // Default to limit 10 if not provided
    const skip = (page - 1) * limit;

    // Fetch nurses with pagination
    const nurses = await nurseModel.find().skip(skip).limit(limit);

    // Total count for pagination metadata
    const totalNurses = await nurseModel.countDocuments();

    res.status(200).send({
      success: true,
      message: "Nurses retrieved successfully",
      data: nurses,
      pagination: {
        total: totalNurses,
        currentPage: page,
        totalPages: Math.ceil(totalNurses / limit),
        hasNextPage: page * limit < totalNurses,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in getting all nurses with pagination",
      error: error.message,
    });
  }
};

//creating api to get a single nurse
const getNurse = async (req, res) => {
  try {
    const id = req.params.id;
    const resp = await nurseModel.findById(id);
    if (!resp)
      return res.status(404).send({ success: false, message: "Nurse not found" });
    res.status(200).send({
      success: true,
      message: "Nurse retrieved successfully",
      data: resp,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
    });
  }
};

// creating api to login nurse
const loginNurse = async (req, res) => {
  try {
    const { email, password } = req.body;

    const find_nurse = await nurseModel.findOne({ email: email });
    if (!find_nurse)
      return res.status(404).send({ success: false, message: "Nurse not found" });

    const compare_password = await bcryptjs.compare(
      password,
      find_nurse.password
    );
    if (!compare_password)
      return res.status(401).send({
        success: false,
        message: "Invalid password",
      });

    const nurse_data = {
      id: find_nurse._id,
      full_name: find_nurse.full_name,
      email: find_nurse.email,
      departmentId: find_nurse.departmentId,
      address: find_nurse.address,
      phone: find_nurse.phone,
      appointment_date: find_nurse.appointment_date,
    };
    res.status(200).send({
      success: true,
      message: "Nurse logged in successfully",
      data: nurse_data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in logging nurse",
      error: error.message,
    });
  }
};

// creating api to edit nurse details
const updateNurse = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      full_name,
      email,
      department,
      address,
      phone,
      appointment_date,
      password,
      departmentId
    } = req.body;

    // Hash the new password if it is provided
    let hashedPassword = password;
    if (password) {
      hashedPassword = await bcryptjs.hash(password, 10);
    }
    const updatedNurse = await nurseModel.findByIdAndUpdate(
      id,
      {
        full_name,
        email,
        department,
        address,
        phone,
        appointment_date,
        departmentId,
        password: hashedPassword,
      },
      { new: true, runValidators: true }
    );
    if (!updatedNurse) return res.status(404).send({ success: false, message: "Nurse not found" });
    res.status(200).send({
      success: true,
      message: "Nurse details updated successfully",
      data: updatedNurse,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in editing nurse details",
      error: error.message,
    });
  }
};

// creating api to delete nurse
const deleteNurse = async (req, res) => {
  try {
    const { id } = req.params;
    await nurseModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Nurse deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in deleting nurse",
      error: error.message,
    });
  }
};

module.exports = {
  registerNurse,
  loginNurse,
  updateNurse,
  deleteNurse,
  getAllNurses,
  getNurse,
};
