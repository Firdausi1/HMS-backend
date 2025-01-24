const employeeModel = require("../models/employee.model");

// creating api to get all pharmacists
const getAllPharmacists = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    // fetch pharmacists with pagination
    const pharmacists = await employeeModel
      .find({ role: "Pharmacist" })
      .skip(skip)
      .limit(limit);

    // Total count for pagination metadata
    const totalPharmacists = pharmacists.length;

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
      },
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  getAllPharmacists,
};
