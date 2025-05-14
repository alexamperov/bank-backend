const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { getDealsByUserId, getDealById } = require('../controllers/deal');

router.get('/deals', authenticate, getDealsByUserId);
router.get('/deals/:dealId', authenticate, getDealById);

module.exports = router;