const questionRepository = require('../repositories/question.repository');
const AppError = require('../utils/appError');

class QuestionService {
    async getAllQuestions() {
        return await questionRepository.findAll();
    }

    async getQuestionById(id) {
        const question = await questionRepository.findById(id);
        if (!question) {
            throw new AppError('Pregunta no encontrada', 404);
        }
        return question;
    }

    async createQuestion(questionData) {
        return await questionRepository.create(questionData);
    }

    async updateQuestion(id, questionData) {
        const question = await questionRepository.findById(id);
        if (!question) {
            throw new AppError('Pregunta no encontrada', 404);
        }

        return await questionRepository.update(id, questionData);
    }
}

module.exports = new QuestionService();