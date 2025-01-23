const mongoose = require("mongoose");

const AccountantSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNo: { type: String, required: true },
    address: { type: String, required: true },
    departmentId: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true }
);

const Accountant = mongoose.model("Accountant", AccountantSchema);
module.exports = Accountant;
