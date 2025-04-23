const evaluationRepository = require('../repositories/evaluation.repository');
const questionRepository = require('../repositories/question.repository');
const employeeRepository = require('../repositories/employee.repository');
const AppError = require('../utils/appError');
const { EvaluationFactory } = require('../utils/evaluationFactory');

class EvaluationService {
    async getAllEvaluations() {
        return await evaluationRepository.findAll();
    }

    async getEvaluationById(id) {
        const evaluation = await evaluationRepository.findWithDetails(id);
        if (!evaluation) {
            throw new AppError('Evaluación no encontrada', 404);
        }
        return evaluation;
    }

    async createEvaluation(evaluationData) {
        const employee = await employeeRepository.findById(evaluationData.employee);
        if (!employee) {
            throw new AppError('Empleado no encontrado', 404);
        }

        const evaluator = await employeeRepository.findById(evaluationData.evaluator);
        if (!evaluator) {
            throw new AppError('Evaluador no encontrado', 404);
        }

        const evaluationFactory = new EvaluationFactory();
        const evaluationConfig = evaluationFactory.createEvaluation(
            evaluationData.type,
            evaluationData
        );

        const questions = await questionRepository.findByCategory(
            this.getCategoryByEvaluationType(evaluationData.type)
        );

        evaluationConfig.questionSet = questions.map(q => q._id);

        return await evaluationRepository.create(evaluationConfig);
    }

    getCategoryByEvaluationType(type) {
        const categoryMap = {
            'self': 'productivity',
            'peer': 'teamwork',
            'manager': 'leadership',
            'subordinate': 'communication',
            'complete360': 'technical'
        };

        return categoryMap[type] || 'technical';
    }

    async updateEvaluation(id, evaluationData) {
        const evaluation = await evaluationRepository.findById(id);
        if (!evaluation) {
            throw new AppError('Evaluación no encontrada', 404);
        }

        if (evaluationData.hasOwnProperty('completed')) {
            delete evaluationData.completed;
        }

        return await evaluationRepository.update(id, evaluationData);
    }

    async submitEvaluation(id, responses, evaluatorId) {
        const evaluation = await evaluationRepository.findById(id);
        if (!evaluation) {
            throw new AppError('Evaluación no encontrada', 404);
        }

        if (evaluation.completed) {
            throw new AppError('Esta evaluación ya ha sido completada', 400);
        }

        if (evaluation.evaluator.toString() !== evaluatorId) {
            throw new AppError('No tienes permiso para enviar esta evaluación', 403);
        }

        await evaluationRepository.update(id, { completed: true });
    }
}

module.exports = new EvaluationService();