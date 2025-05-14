const { pool } = require('../config/db');

const Application = {
    create: async (userId, data) => {
        const { sum, percent, returnAt } = data;
        const date = new Date();
        const timestamp = date.toISOString();
        const res = await pool.query(
            `INSERT INTO applies (user_id, sum, percent, return_at, created_at) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [userId, sum, percent, returnAt, timestamp]
        );
        return res.rows[0];
    },
    getById: async (id) => {
        const res = await pool.query('SELECT * FROM applies WHERE id = $1', [id]);
        return res.rows[0];
    },
    getAllByUserId: async (userId) => {
        const res = await pool.query('SELECT * FROM applies WHERE user_id = $1', [userId]);
        return res.rows;
    },
    updateStatus: async (id, status, employeeId) => {
        const res = await pool.query(
            `UPDATE applies SET status = $1, employee_id = $2 WHERE id = $3 RETURNING *`,
            [status, employeeId, id]
        );
        return res.rows[0];
    }
};

module.exports = Application;