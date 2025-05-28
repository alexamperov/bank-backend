const Deal = require('../models/deal');

//TODO Протестировать
exports.getDealsByUserId = async (req, res) => {

    try { // Если пользователь запрашивает свои договоры
        if (req.query.user_id){
            const deals = await Deal.getAllByUserId(req.query.user_id);
            res.json(deals);
        } else {        // Если работник или админ запрашивают договоры по айди пользователя
            const deals = await Deal.getAllByUserId(req.user.id);
            res.json(deals);
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// TODO Протестировать
exports.getDealById = async (req, res) => {
    try {
        const { dealId } = req.params;
        const deal = await Deal.getById(dealId);
        res.json(deal);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};