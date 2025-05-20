// TODO Хендлеры:
// Получение всех платежей
// Создание платежа
const Payment = require('../models/pay');
const Deal = require('../models/deal');

// Получить все платежи по договору
exports.getPaymentsByDealId = async (req, res) => {
    try {
        const { dealId } = req.params;

        // Проверка, принадлежит ли договор пользователю
        const deal = await Deal.getById(dealId);
        if (deal.user_id !== req.user.id && req.user.role !== 'employee' && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied' });
        }

        const payments = await Payment.getAllByDealId(dealId);
        res.json(payments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Создать платеж по договору
exports.createPayment = async (req, res) => {
    try {
        const { dealId } = req.params;
        const { amount, method } = req.body;

        // Проверка существования договора
        const deal = await Deal.getById(dealId);
        if (!deal) return res.status(404).json({ error: 'Deal not found' });

        // Создание платежа
        const payment = await Payment.create(dealId, amount, method);
        res.status(201).json(payment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};