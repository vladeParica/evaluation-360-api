const employeeService = require('../services/employee.service');
const catchAsync = require('../utils/catchAsync');

exports.getAllEmployees = catchAsync(async (req, res) => {
    const employees = await employeeService.getAllEmployees();

    res.status(200).json({
        status: 'success',
        results: employees.length,
        data: {
            employees
        }
    });
});

exports.getEmployee = catchAsync(async (req, res) => {
    const employee = await employeeService.getEmployeeById(req.params.id);

    res.status(200).json({
        status: 'success',
        data: {
            employee
        }
    });
});

exports.createEmployee = catchAsync(async (req, res) => {
    const employee = await employeeService.createEmployee(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            employee
        }
    });
});

exports.updateEmployee = catchAsync(async (req, res) => {
    const employee = await employeeService.updateEmployee(req.params.id, req.body);

    res.status(200).json({
        status: 'success',
        data: {
            employee
        }
    });
});