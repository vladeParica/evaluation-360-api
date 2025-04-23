const reportService = require('../services/report.service');
const catchAsync = require('../utils/catchAsync');

exports.getEmployeeReport = catchAsync(async (req, res) => {
    const report = await reportService.generateEmployeeReport(req.params.id);

    res.status(200).json({
        status: 'success',
        data: {
            report
        }
    });
});

exports.getDepartmentReport = catchAsync(async (req, res) => {
    const report = await reportService.generateDepartmentReport(req.params.id);

    res.status(200).json({
        status: 'success',
        data: {
            report
        }
    });
});