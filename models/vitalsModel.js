const mongoose = require("mongoose");

const vitalsSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  nurse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Nurse",
    // required: true,
  },
  bloodPressure: {
    systolic: { type: Number, required: true }, // e.g . 120
    diastolic: { type: Number, required: true }, // e.g. 80
  },
  heartRate: {
    type: Number,
    required: true, // e.g. 70
  },
  temperature: {
    type: Number,
    required: true, // e.g. 98.6°C
  },
  respiratoryRate: {
    type: Number,
    required: true, // e.g. 12 breaths per minute
  },
  oxygenSaturation: {
    type: Number,
    required: true, // e.g. 98%
  },
  notes: {
    type: String, // additional comments or observations
  },
},
{ timestamps: true}
); 

const vitalsModel = mongoose.model("Vitals", vitalsSchema);
module.exports = vitalsModel;

