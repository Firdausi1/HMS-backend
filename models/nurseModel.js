const mongoose = require("mongoose");

const nurseSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    departmentId: mongoose.Schema.Types.ObjectId,
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    appointment_date: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile_image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const nurseModel = mongoose.model("Nurse", nurseSchema);
module.exports = nurseModel;
