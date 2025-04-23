const responseRepository = require('../repositories/response.repository');
const evaluationRepository = require('../repositories/evaluation.repository');
const AppError = require('../utils/appError');

class ResponseService {
    async getResponsesByEvaluation(evaluationId) {
        return await responseRepository.findByEvaluation(evaluationId);
    }

    async createResponses(evaluationId, responsesData) {
        const evaluation = await evaluationRepository.findById(evaluationId);
        if (!evaluation) {
            throw new AppError('Evaluación no encontrada', 404);
        }

        const questionIds = evaluation.questionSet.map(q => q.toString());

        const preparedResponses = responsesData.map(response => {
            if (!response.question || !response.evaluator) {
                throw new AppError('Faltan campos requeridos en la respuesta', 400);
            }

            if (!questionIds.includes(response.question.toString())) {
                throw new AppError(`La pregunta ${response.question} no pertenece a esta evaluación`, 400);
            }

            return {
                evaluation: evaluationId,
                question: response.question,
                evaluator: response.evaluator,
                numericalResponse: response.numericalResponse,
                textResponse: response.textResponse,
                multipleChoiceResponse: response.multipleChoiceResponse
            };
        });

        return await responseRepository.createMany(preparedResponses);
    }
}

module.exports = new ResponseService();