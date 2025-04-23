const express = require('express');
const reportController = require('../controllers/report.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware.protect);

router.get('/employee/:id',
    authMiddleware.restrictTo('admin', 'manager'),
    reportController.getEmployeeReport
);

router.get('/department/:id',
    authMiddleware.restrictTo('admin', 'manager'),
    reportController.getDepartmentReport
);

module.exports = router;