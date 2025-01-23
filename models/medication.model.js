const mongoose = require("mongoose");


const medicationSchema = new mongoose.Schema({
    name: String,
    description: String
  });

  const Medication = mongoose.model("Medication", medicationSchema);
  module.exports = Medication;