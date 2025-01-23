const mongoose = require("mongoose");

const pharmacistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
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
  profile_image: {
    type: String,
    required : true,
  }
},
{ timestamps : true } 
);

const pharmacistModel = mongoose.model("Pharmacist", pharmacistSchema);
module.exports = pharmacistModel;
