const evaluationRepository = require('../repositories/evaluation.repository');
const responseRepository = require('../repositories/response.repository');
const employeeRepository = require('../repositories/employee.repository');
const AppError = require('../utils/appError');
const { ScoreCalculatorFactory } = require('../utils/scoreCalculatorFactory');

class ReportService {
    async generateEmployeeReport(employeeId) {
        const employee = await employeeRepository.findById(employeeId);
        if (!employee) {
            throw new AppError('Empleado no encontrado', 404);
        }

        const evaluations = await evaluationRepository.findByEmployee(employeeId);

        if (evaluations.length === 0) {
            return {
                employee,
                evaluations: [],
                scores: {},
                averageScore: 0
            };
        }

        const evaluationResults = [];
        let totalScore = 0;
        let totalResponses = 0;

        const scoreCalculatorFactory = new ScoreCalculatorFactory();

        const categoryScores = {
            leadership: { total: 0, count: 0 },
            communication: { total: 0, count: 0 },
            teamwork: { total: 0, count: 0 },
            technical: { total: 0, count: 0 },
            productivity: { total: 0, count: 0 }
        };

        for (const evaluation of evaluations) {
            if (!evaluation.completed) continue;

            const responses = await responseRepository.findByEvaluation(evaluation._id);

            const calculator = scoreCalculatorFactory.createCalculator(evaluation.type);
            const score = calculator.calculate(responses);

            totalScore += score.average;
            totalResponses++;

            for (const response of responses) {
                if (response.numericalResponse && response.question.category) {
                    const category = response.question.category;
                    categoryScores[category].total += response.numericalResponse;
                    categoryScores[category].count++;
                }
            }

            evaluationResults.push({
                evaluation,
                score
            });
        }

        const categoryAverages = {};
        for (const [category, data] of Object.entries(categoryScores)) {
            categoryAverages[category] = data.count > 0 ? data.total / data.count : 0;
        }

        return {
            employee,
            evaluations: evaluationResults,
            scores: categoryAverages,
            averageScore: totalResponses > 0 ? totalScore / totalResponses : 0
        };
    }

    async generateDepartmentReport(department) {
        const employees = await employeeRepository.findByDepartment(department);

        if (employees.length === 0) {
            throw new AppError('No se encontraron empleados en este departamento', 404);
        }

        const employeeReports = [];
        let departmentTotalScore = 0;

        for (const employee of employees) {
            const report = await this.generateEmployeeReport(employee._id);
            employeeReports.push(report);
            departmentTotalScore += report.averageScore;
        }

        const departmentAverageScore = departmentTotalScore / employees.length;

        return {
            department,
            employeeCount: employees.length,
            averageScore: departmentAverageScore,
            employees: employeeReports
        };
    }
}

module.exports = new ReportService();