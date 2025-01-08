const mongoose = require("mongoose");

const PatientSchema = mongoose.Schema(
  {
    username: { type: String, requred: true },
    password: { type: String, requred: true },
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", PatientSchema);
module.exports = Patient;