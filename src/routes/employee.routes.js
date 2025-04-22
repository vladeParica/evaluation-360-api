const express = require('express');
const employeeController = require('../controllers/employee.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { validateEmployee } = require('../middlewares/validators/employee.validator');

const router = express.Router();

router.use(authMiddleware.protect);

router.route('/')
    .get(authMiddleware.restrictTo('admin', 'manager'), employeeController.getAllEmployees)
    .post(authMiddleware.restrictTo('admin'), validateEmployee, employeeController.createEmployee);

router.route('/:id')
    .get(employeeController.getEmployee)
    .put(
        authMiddleware.restrictTo('admin', 'manager'),
        validateEmployee,
        employeeController.updateEmployee
    );

module.exports = router;