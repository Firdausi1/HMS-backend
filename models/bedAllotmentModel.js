const mongoose = require("mongoose");

const bedAllotmentSchema =  new mongoose.Schema({
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
    bed: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bed",
      required: true,
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
      enum: ["Alloted", "Discharged", "Expired"],
      required: true,
      default: "Alloted",
    },
    notes: {
      type: String, // Any additional information related to the allotment
    },
},
{ timestamps: true }
);

const bedAllotmentModel =  mongoose.model("BedAllotment", bedAllotmentSchema);
module.exports = bedAllotmentModel;