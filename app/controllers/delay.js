// TODO Хендлер Создание просрочки для работника

// TODO Хендлер Получение всех по ID договора для всех ролей

const Delay = require('../models/delay');
const Deal = require('../models/deal');
const User = require('../models/user');

// Создать просрочку (только для сотрудников)
exports.createDelay = async (req, res) => {
    try {
        const { dealId } = req.params;
        const { amount } = req.body;
        const employee = await User.getById(req.user.id);

        // Проверка роли
        if (employee.role !== 'employee' && employee.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Проверка существования договора
        const deal = await Deal.getById(dealId);
        if (!deal) return res.status(404).json({ error: 'Deal not found' });

        // Создание просрочки
        const delay = await Delay.create(dealId, amount, req.user.id);
        res.status(201).json(delay);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Получить все просрочки по договору
exports.getDelaysByDealId = async (req, res) => {
    try {
        const { dealId } = req.params;

        // Проверка, принадлежит ли договор пользователю
        const deal = await Deal.getById(dealId);

        const delays = await Delay.getAllByDealId(dealId);
        res.json(delays);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};