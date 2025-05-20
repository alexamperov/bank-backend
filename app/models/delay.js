// TODO Создание просрочки для работника в бд

// TODO Получение всех по ID договора для всех ролей

const { pool } = require('../config/db');

const Delay = {
    create: async (dealId, amount, employeeId) => {
        const query = `
      INSERT INTO delays (deal_id, amount, employee_id, status)
      VALUES ($1, $2, $3, 'pending')
      RETURNING *`;
        const values = [dealId, amount, employeeId];
        const res = await pool.query(query, values);
        return res.rows[0];
    },

    getAllByDealId: async (dealId) => {
        const res = await pool.query('SELECT * FROM delays WHERE deal_id = $1', [dealId]);
        return res.rows;
    }
};

module.exports = Delay;