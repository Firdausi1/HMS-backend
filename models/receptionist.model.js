const mongoose = require('mongoose');

const receptionistSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date: { type: Date, required: true },
  hospital_Id: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true }
},
{ timestamps: true }
);

const receptionistModel = mongoose.model('Receptionist', receptionistSchema);
module.exports = receptionistModel;
