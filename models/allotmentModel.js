const mongoose = require("mongoose");

const allotmentSchema =  new mongoose.Schema({
   patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    nurse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Nurse",
      required: true,
    },
    bedNumber: {
      type: String,
      required: true, // e.g., "B-101" or "ICU-12"
    },
    ward: {
      type: String,
      required: true, // e.g., "General Ward", "ICU", "Private Room"
    },
    allotmentDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    dischargeDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["Active", "Discharged", "Expired"],
      required: true,
      default: "Active",
    },
    notes: {
      type: String, // Any additional information related to the allotment
    },
},
{ timestamps: true }
);

const allotmentModel =  mongoose.model("Allotment", allotmentSchema);
module.exports = allotmentModel;