const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    password: { type: String, required: true },
  },
  { timestamps: true, toJSON: { getters: true } }
);

const adminModel = mongoose.model("Admin", AdminSchema);
module.exports = adminModel;
