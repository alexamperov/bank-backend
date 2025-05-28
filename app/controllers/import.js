const pool = require('../config/db');
const fs = require('fs');
const path = require('path');

// Импорт пользователей
exports.importUsers = async (req, res) => {
    const filePath = path.join(__dirname, '../exports/users.json');
    await importData(res, filePath, 'users');
};

// Импорт заявок
exports.importApplications = async (req, res) => {
    const filePath = path.join(__dirname, '../exports/applications.json');
    await importData(res, filePath, 'applications');
};

// Импорт договоров
exports.importDeals = async (req, res) => {
    const filePath = path.join(__dirname, '../exports/deals.json');
    await importData(res, filePath, 'deals');
};

// Импорт платежей
exports.importPays = async (req, res) => {
    const filePath = path.join(__dirname, '../exports/pays.json');
    await importData(res, filePath, 'pays');
};

// Импорт просрочек
exports.importDelays = async (req, res) => {
    const filePath = path.join(__dirname, '../exports/delays.json');
    await importData(res, filePath, 'delays');
};

// Общий метод для импорта
async function importData(res, filePath, tableName) {
    try {
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'File not found' });
        }

        const data = JSON.parse(fs.readFileSync(filePath));

        for (const item of data) {
            const keys = Object.keys(item).join(', ');
            const values = Object.values(item);
            const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');

            // Удаляем запись, если уже существует
            await pool.query(`DELETE FROM ${tableName} WHERE id = $1`, [item.id]);

            // Вставляем новые данные
            await pool.query(
                `INSERT INTO ${tableName} (${keys}) VALUES (${placeholders})`,
                values
            );
        }

        res.json({ message: `${tableName} imported successfully` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}