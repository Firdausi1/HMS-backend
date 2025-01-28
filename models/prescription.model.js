const mongoose = require("mongoose");


const prescriptionSchema = new mongoose.Schema({
    patientId: mongoose.Schema.Types.ObjectId,
    doctorId: mongoose.Schema.Types.ObjectId,
    nurse: mongoose.Schema.Types.ObjectId,
    bed: mongoose.Schema.Types.ObjectId,
    caseHistory: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    medications: [{
      medicationId: mongoose.Schema.Types.ObjectId,
      dosage: String
    }],
    amount: {
      type: Number,
    },
    date: { type: Date, default: Date.now }
  });

  const Prescription = mongoose.model("Prescription", prescriptionSchema);
module.exports = Prescription;