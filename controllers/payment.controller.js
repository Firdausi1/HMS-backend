// controllers/paymentController.js
const Invoice = require('../models/invoice.model');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const processPayment = async (req, res) => {
    try {
        const { patientId, amount, token } = req.body;
        const charge = await stripe.charges.create({
            amount: amount * 100, // Convert to cents
            currency: 'usd',
            source: token,
            description: `Payment for patient ${patientId}`
        });
        
        const invoice = new Invoice({ patientId, amount, status: 'Paid' });
        await invoice.save();
        res.json({ message: 'Payment successful', charge });
    } catch (error) {
        res.status(500).json({ message: 'Payment failed', error });
    }
};

const getPaymentHistory = async (req, res) => {
    try {
        const { patientId } = req.params;
        const invoices = await Invoice.find({ patientId });
        res.json(invoices);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving payment history', error });
    }
};

module.exports = { processPayment, getPaymentHistory };