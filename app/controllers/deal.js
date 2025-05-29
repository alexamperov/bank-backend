const Deal = require('../models/deal');
const Payment = require('../models/pay');

exports.getDealsByEmployeeID = async (req, res) => {
    try { // Если пользователь запрашивает свои договоры
        if (req.query.employee_id){
            const deals = await Deal.getAllByEmployeeId(req.query.employee_id);
            res.json(deals);
        } else {        // Если работник или админ запрашивают договоры по айди пользователя
            const deals = await Deal.getAllByEmployeeId(req.user.id);
            // TODO изменение статуса если платежей >= Суммы кредита
            res.json(deals);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getAllDeals = async (req, res) => {
    try { // Если пользователь запрашивает свои договоры

            const deals = await Deal.getAll();
            res.json(deals);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
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

            let sum = 0
            const pays = await Payment.getAllByDealId(dealId)
            for (let j = 0; j < pays.length; j++) {
                sum += pays[j].amount
            }
            //TODO не заходит в условие
            if (sum >= deal.amount) {
                console.log("In Uslobiye")
                deal.status = 'completed'
            }
            console.log(sum)
        res.json(deal);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};