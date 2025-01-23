const mongoose = require("mongoose");

const bedSchema = new mongoose.Schema({
  bedNumber: {
    type: String,
    required: true,  // e.g., "B-101" or "ICU-12"
    unique: true,
  },
  ward: {
    type: String,
    required: true, // e.g general ward, ICU
  },
  status: {
    type: String,
    enum: ["Available", "Occupied", "Reserved"],
    default: "Available",
  },
  notes: {
    type: String, // any additional details about the bed
  },
}, 
{ timestamps: true }
);

const bedModel = mongoose.model("Bed", bedSchema);
module.exports = bedModel;