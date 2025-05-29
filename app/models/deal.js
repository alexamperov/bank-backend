const { pool } = require('../config/db');

const Deal = {
    create: async (data) => {
        const { userId, employeeId, sum, percent, returnAt } = data;
        const res = await pool.query(
            `INSERT INTO deals (user_id, employee_id, sum, percent, return_at)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [userId, employeeId, sum, percent, returnAt]
        );
        return res.rows[0];
    },
    getAllByUserId: async (userId) => {
        const res = await pool.query('SELECT * FROM deals WHERE user_id = $1', [userId]);
        return res.rows;
    },
    getById: async (id) => {
        const res = await pool.query('SELECT * FROM deals WHERE id = $1', [id]);
        return res.rows[0];
    },
    getAllByEmployeeId: async (employeeId) => {
        const res = await pool.query( 'SELECT * FROM deals WHERE employee_id = $1', [employeeId])
        return res.rows
    },
    getAll: async () => {
        const res = await pool.query( 'SELECT * FROM deals')
        return res.rows
    }
};

module.exports = Deal;