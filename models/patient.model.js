const mongoose = require("mongoose");

const PatientSchema = mongoose.Schema(
  {
    name: { type: String, requred: true },
    email: { type: String, requred: true },
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", PatientSchema);
module.exports = Patient;