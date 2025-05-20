const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { getPaymentsByDealId, createPayment } = require('../controllers/pay');

// Получение платежей по договору
router.get('/deals/:dealId/payments', authenticate, getPaymentsByDealId);

// Создание платежа по договору
router.post('/deals/:dealId/payments', authenticate, createPayment);

module.exports = router;