const evaluationService = require('../services/evaluation.service');
const catchAsync = require('../utils/catchAsync');

exports.getAllEvaluations = catchAsync(async (req, res) => {
    const evaluations = await evaluationService.getAllEvaluations();

    res.status(200).json({
        status: 'success',
        results: evaluations.length,
        data: {
            evaluations
        }
    });
});

exports.getEvaluation = catchAsync(async (req, res) => {
    const evaluation = await evaluationService.getEvaluationById(req.params.id);

    res.status(200).json({
        status: 'success',
        data: {
            evaluation
        }
    });
});

exports.createEvaluation = catchAsync(async (req, res) => {
    const evaluation = await evaluationService.createEvaluation(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            evaluation
        }
    });
});

exports.updateEvaluation = catchAsync(async (req, res) => {
    const evaluation = await evaluationService.updateEvaluation(req.params.id, req.body);

    res.status(200).json({
        status: 'success',
        data: {
            evaluation
        }
    });
});

exports.submitEvaluation = catchAsync(async (req, res) => {
    const result = await evaluationService.submitEvaluation(
        req.params.id,
        req.body.responses,
        req.body.evaluator
    );

    res.status(200).json({
        status: 'success',
        data: {
            result
        }
    });
});