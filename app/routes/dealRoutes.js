const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { getDealsByUserId, getDealById, getDealsByEmployeeID, getAllDeals} = require('../controllers/deal');

router.get('/deals', authenticate, getDealsByUserId);
router.get(
    '/deals_employee', authenticate, getDealsByEmployeeID,
)
router.get('/deals/:dealId', authenticate, getDealById);
router.get('/deals_all', authenticate, getAllDeals);
module.exports = router;