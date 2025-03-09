// routes/paymentRoutes.js
const express = require('express');

const { processPayment, getPaymentHistory } = require('../controllers/payment.controller');
const router = express.Router();

router.post('/pay', processPayment);
router.get('/history/:patientId', getPaymentHistory);

module.exports = router;