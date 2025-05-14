const { pool } = require('../config/db');

const User = {
    create: async (userData) => {
        const hashedPassword = await require('bcryptjs').hash(userData.password, 10);
        const query = `
      INSERT INTO users 
      (username, first_name, last_name, email, password_hash, user_role, property_type, address, phone) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
      RETURNING *`;
        const values = [
            userData.username,
            userData.first_name,
            userData.last_name,
            userData.email,
            hashedPassword,
            userData.role || 'user',
            userData.property_type,
            userData.address,
            userData.phone
        ];
        const res = await pool.query(query, values);

        console.log("Creating User Status: ",res);

        return res.rows[0];
    },
    getByEmail: async (email) => {
        const res = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
        return res.rows[0];
    },
    getById: async (id) => {
        const res = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        return res.rows[0];
    },
    updateVerification: async (email) => {
        await pool.query('UPDATE users SET is_verified = true WHERE email = $1', [email]);
    }
};

module.exports = User;