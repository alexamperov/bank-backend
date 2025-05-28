const Application = require('../models/application');
const Deal = require('../models/deal');
const User = require('../models/user');

exports.createApplication = async (req, res) => {
    try {
        const userId = req.user.id;
        const { sum, percent, returnAt } = req.body;
        const application = await Application.create(userId, { sum, percent, returnAt });
        res.status(201).json(application);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// TODO Протестировать работу двух случаев - ID из токена и ID из query
exports.getApplicationsByUserId = async (req, res) => {
    try {
        if (req.query.user_id){
            const apps = await Application.getAllByUserId(req.query.user_id);
            res.json(apps);
        } else {
            const apps = await Application.getAllByUserId(req.user.id);
            res.json(apps);
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// TODO Протестировать работу
exports.approveApplication = async (req, res) => {
    try {
        const { applicationId } = req.params;
        c
        if (req.user.role !== 'employee' && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied' });
        }

        const updatedApp = await Application.updateStatus(applicationId, 'approved', req.user.id);
        const deal = await Deal.create({
            userId: updatedApp.user_id,
            employeeId: req.user.id,
            sum: updatedApp.sum,
            percent: updatedApp.percent,
            returnAt: updatedApp.return_at
        });

        res.json({ application: updatedApp, deal });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// TODO Протестировать работу
exports.rejectApplication = async (req, res) => {
    try {
        const { applicationId } = req.params;
        const updatedApp = await Application.updateStatus(applicationId, 'rejected', req.user.id);
        res.json(updatedApp);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};