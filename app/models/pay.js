// TODO Получение всех платежей из БД по ID договора
// TODO Создание платежа в бд

const { pool } = require('../config/db');

const Payment = {
    create: async (dealId, amount, method) => {
        const query = `
      INSERT INTO payments (deal_id, amount, method, status)
      VALUES ($1, $2, $3, 'completed')
      RETURNING *`;
        const values = [dealId, amount, method];
        const res = await pool.query(query, values);
        return res.rows[0];
    },

    getAllByDealId: async (dealId) => {
        const res = await pool.query('SELECT * FROM payments WHERE deal_id = $1', [dealId]);
        return res.rows;
    }
};

module.exports = Payment;