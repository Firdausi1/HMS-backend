const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema({
    patientId: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
