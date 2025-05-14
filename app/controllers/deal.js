const Deal = require('../models/deal');

exports.getDealsByUserId = async (req, res) => {
    try {
        const deals = await Deal.getAllByUserId(req.user.id);
        res.json(deals);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getDealById = async (req, res) => {
    try {
        const { dealId } = req.params;
        const deal = await Deal.getById(dealId);
        if (deal.user_id !== req.user.id) return res.status(403).json({ error: 'Access denied' });
        res.json(deal);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};