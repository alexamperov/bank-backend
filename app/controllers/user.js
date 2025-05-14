const User = require('../models/user');
const redisClient = require('../services/redis');
const { transporter } = require('../services/email');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    try {
        const { email } = req.body;
        const existingUser = await User.getByEmail(email);
        if (existingUser) return res.status(400).json({ error: 'User already exists' });

        const code = Math.floor(1000 + Math.random() * 9000);
        await redisClient.set(email, code, {'EX': 300});
        console.log(redisClient)

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Подтверждение email',
            text: `Ваш код: ${code}`
        });

        const newUser = await User.create(req.body);
        res.status(201).json({ message: 'Verification code sent', userId: newUser.id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.verifyEmail = async (req, res) => {
    try {
        const { email, code } = req.body;
        const storedCode = await redisClient.get(email);
        if (storedCode !== code) return res.status(400).json({ error: 'Invalid code' });

        await User.updateVerification(email);
        await redisClient.del(email);
        res.json({ message: 'Verified successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        // TODO Role
        // TODO Authenticate with password
        const { email, password } = req.body;
        const user = await User.getByEmail(email);

        const token = jwt.sign({ "id": user.id, "role": user.user_role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getMe = async (req, res) => {
    try {
        const user = await User.getById(req.user.id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const { password, ...data } = user;
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};