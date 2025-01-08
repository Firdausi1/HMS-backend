const mongoose = require("mongoose");

const PatientSchema = mongoose.Schema(
  {
    patient_id: {type: mongoose.Schema.Types.ObjectId, ref: "Patient"},
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", PatientSchema);
module.exports = Patient;