// // models/Appointment.js
// const mongoose = require("mongoose");

// const appointmentSchema = new mongoose.Schema({
//     patient: {
//         type: mongoose.Schema.Types.ObjectId,  // Reference to the Patient model
//         ref: 'Patient',                        // Refers to the 'Patient' model
//         required: true,                        // Make sure the patient is required
//     },
//     patient_name: {
//         type: String,
//         required: true
//     },
//     date: {
//         type: Date,
//         required: true,
//         get: function (value) {
//             const date = new Date(value);
//             const year = date.getFullYear();
//             const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ensure 2 digits
//             const day = date.getDate().toString().padStart(2, '0'); // Ensure 2 digits
//             return `${year}/${month}/${day}`;
//         }
//     },
//     doctorName: {
//         type: String,
//         required: true,
//     },

// },
//     { timestamps: true }
// );


// const appointmentModel = mongoose.model("Appointment", appointmentSchema);

// module.exports = appointmentModel


const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the Patient model
        ref: 'Patient', // Refers to the 'Patient' model
        required: true, // Ensure the patient is required
    },
    patient_name: {
        type: String,
        required: true,
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
            const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ensure 2 digits
            const day = date.getDate().toString().padStart(2, '0'); // Ensure 2 digits
            return `${year}/${month}/${day}`;
        },
    },

}, { timestamps: true });

const appointmentModel = mongoose.model("Appointment", appointmentSchema);

module.exports = appointmentModel;
