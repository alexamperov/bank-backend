const express = require('express');
const router = express.Router();
const {
    exportUsers,
    exportApplications,
    exportDeals,
    exportDelays
} = require('../controllers/export');
const {
    importUsers,
    importApplications,
    importDeals,
    importDelays
} = require('../controllers/import');

// Экспорт
router.get('/export/users', exportUsers);
router.get('/export/applications', exportApplications);
router.get('/export/deals', exportDeals);
router.get('/export/delays', exportDelays);

// Импорт
router.post('/import/users', importUsers);
router.post('/import/applications', importApplications);
router.post('/import/deals', importDeals);
router.post('/import/delays', importDelays);

module.exports = router;