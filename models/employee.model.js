const mongoose = require("mongoose");

const EmployeeSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    departmentId: mongoose.Schema.Types.ObjectId,
    role: {
      type: String,
      enum: ["Doctor", "Nurse", "Accountant", "Receptionist", "Pharmacist"],
      required: true,
    },
    profile_image: {
      type: String,
    }
  },
  { timestamps: true }
);

const employeeModel = mongoose.model("Employee", EmployeeSchema);
module.exports = employeeModel;
