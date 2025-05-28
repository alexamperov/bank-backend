const pool = require('../config/db');
const fs = require('fs');
const path = require('path');

// Экспорт всех пользователей
exports.exportUsers = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        const filePath = path.join(__dirname, '../exports/users.json');
        fs.writeFileSync(filePath, JSON.stringify(result.rows, null, 2));
        res.download(filePath, 'users.json');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Экспорт заявок
exports.exportApplications = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM applies');
        const filePath = path.join(__dirname, '../exports/applications.json');
        fs.writeFileSync(filePath, JSON.stringify(result.rows, null, 2));
        res.download(filePath, 'applications.json');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Экспорт договоров
exports.exportDeals = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM deals');
        const filePath = path.join(__dirname, '../exports/deals.json');
        fs.writeFileSync(filePath, JSON.stringify(result.rows, null, 2));
        res.download(filePath, 'deals.json');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Экспорт просрочек
exports.exportDelays = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM delays');
        const filePath = path.join(__dirname, '../exports/delays.json');
        fs.writeFileSync(filePath, JSON.stringify(result.rows, null, 2));
        res.download(filePath, 'delays.json');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Экспорт платежей
exports.exportPays = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM pays');
        const filePath = path.join(__dirname, '../exports/pays.json');
        fs.writeFileSync(filePath, JSON.stringify(result.rows, null, 2));
        res.download(filePath, 'pays.json');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
