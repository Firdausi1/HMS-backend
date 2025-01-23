const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    gender: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    bloodGroup: {
      type: String,
      required: true
    },
    
    phone: {
      type: String,
      required: true,
      unique: true
    },
    address: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true,
      get: function (value) {
        const date = new Date(value);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ensure 2 digits
        const day = date.getDate().toString().padStart(2, '0'); // Ensure 2 digits
        return `${year}/${month}/${day}`;
      }
    }
    

  },
  { timestamps: true,toJSON: { getters: true }}
);

const patientModel = mongoose.model("Patient", PatientSchema);
module.exports = patientModel;
