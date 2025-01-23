const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the Patient model
      ref: "Patient", // Refers to the 'Patient' model
      required: true, // Make sure the patient is required
    },
    doctorName: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      get: function (value) {
        const date = new Date(value);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Ensure 2 digits
        const day = date.getDate().toString().padStart(2, "0"); // Ensure 2 digits
        return `${year}/${month}/${day}`; // Return the formatted date
      },
    },
    time: {
      type: String, // Storing time as a string in "HH:mm" format
      required: true,
      validate: {
        validator: function (value) {
          return /^([0-1]\d|2[0-3]):([0-5]\d)$/.test(value); // Validate 24-hour time format "HH:mm"
        },
        message: "Invalid time format. Use HH:mm (24-hour format).",
      },
    },
  },
  { timestamps: true }
);

const appointmentModel = mongoose.model("Appointment", appointmentSchema);

module.exports = appointmentModel;
