const express = require('express');
const router = express.Router();
const { register, verifyEmail, login, getMe, getAllEmployees} = require('../controllers/user');
const { authenticate } = require('../middleware/auth');

router.post('/auth/sign-up', register);
router.post('/auth/verify-email', verifyEmail);
router.post('/auth/sign-in', login);
router.get('/me', authenticate, getMe);
router.get('/employees', authenticate, getAllEmployees);
module.exports = router;