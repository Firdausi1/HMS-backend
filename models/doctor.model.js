const mongoose = require("mongoose");

const DoctorSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    specialization: { type: String, required: true },
    password: { type: String, required: true },
    phoneNo: { type: String, required: true },
    address: { type: String, required: true },
    departmentId: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", DoctorSchema);
module.exports = Doctor;