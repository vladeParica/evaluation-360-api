const questionService = require('../services/question.service');
const catchAsync = require('../utils/catchAsync');

exports.getAllQuestions = catchAsync(async (req, res) => {
    const questions = await questionService.getAllQuestions();

    res.status(200).json({
        status: 'success',
        results: questions.length,
        data: {
            questions
        }
    });
});

exports.getQuestion = catchAsync(async (req, res) => {
    const question = await questionService.getQuestionById(req.params.id);

    res.status(200).json({
        status: 'success',
        data: {
            question
        }
    });
});

exports.createQuestion = catchAsync(async (req, res) => {
    const question = await questionService.createQuestion(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            question
        }
    });
});

exports.updateQuestion = catchAsync(async (req, res) => {
    const question = await questionService.updateQuestion(req.params.id, req.body);

    res.status(200).json({
        status: 'success',
        data: {
            question
        }
    });
});