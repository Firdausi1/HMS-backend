const mongoose = require("mongoose");


const medicationSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: false, // Optional field
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status:{
      type:String,
      enum: ["Available", "Out of Stock"],
      default: "Available",
    },
  },
  { timestamps: true }
);

  const Medication = mongoose.model("Medication", medicationSchema);
  module.exports = Medication;