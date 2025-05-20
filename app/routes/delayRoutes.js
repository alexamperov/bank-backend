const express = require('express');
const router = express.Router();
const { authenticate, checkRole } = require('../middleware/auth');
const { createDelay, getDelaysByDealId } = require('../controllers/delay');

// Только сотрудники могут создавать просрочки
router.post('/deals/:dealId/delays', authenticate, createDelay);

// Получение просрочек по договору
router.get('deals/:dealId/delays', authenticate, getDelaysByDealId);

module.exports = router;