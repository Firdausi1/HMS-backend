const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },
  medications: [
    {
      medication: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Medication", // Assuming you have a Medication model
      },
    },
  ],
  notes: {
    type: String,
    default: "",
  },
  date: { type: Date, default: Date.now },
});

const Prescription = mongoose.model("Prescription", prescriptionSchema);
module.exports = Prescription;
