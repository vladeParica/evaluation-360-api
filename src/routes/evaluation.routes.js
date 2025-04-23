const express = require('express');
const evaluationController = require('../controllers/evaluation.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { validateEvaluation, validateSubmit } = require('../middlewares/validators/evaluation.validator');

const router = express.Router();

router.use(authMiddleware.protect);

router.route('/')
    .get(evaluationController.getAllEvaluations)
    .post(
        authMiddleware.restrictTo('admin', 'manager'),
        validateEvaluation,
        evaluationController.createEvaluation
    );

router.route('/:id')
    .get(evaluationController.getEvaluation)
    .put(
        authMiddleware.restrictTo('admin', 'manager'),
        validateEvaluation,
        evaluationController.updateEvaluation
    );

router.post(
    '/:id/submit',
    authMiddleware.restrictTo('admin'),
    validateSubmit,
    evaluationController.submitEvaluation
);

module.exports = router;