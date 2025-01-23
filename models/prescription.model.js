const mongoose = require("mongoose");


const prescriptionSchema = new mongoose.Schema({
    patientId: mongoose.Schema.Types.ObjectId,
    doctorId: mongoose.Schema.Types.ObjectId,
    medications: [{
      medicationId: mongoose.Schema.Types.ObjectId,
      dosage: String
    }],
    date: { type: Date, default: Date.now }
  });

  const Prescription = mongoose.model("Prescription", prescriptionSchema);
module.exports = Prescription;