const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const {
    createApplication,
    getApplicationsByUserId,
    approveApplication,
    rejectApplication
} = require('../controllers/application');

router.post('/applications', authenticate, createApplication);
router.get('/applications', authenticate, getApplicationsByUserId);
router.post('/applications/:applicationId/approve', authenticate, approveApplication);
router.post('/applications/:applicationId/reject', authenticate, rejectApplication);

module.exports = router;