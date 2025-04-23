const express = require('express');
const questionController = require('../controllers/question.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { validateQuestion } = require('../middlewares/validators/question.validator');

const router = express.Router();

router.use(authMiddleware.protect);

router.route('/')
    .get(questionController.getAllQuestions)
    .post(
        authMiddleware.restrictTo('admin'),
        validateQuestion,
        questionController.createQuestion
    );

router.route('/:id')
    .get(questionController.getQuestion)
    .put(
        authMiddleware.restrictTo('admin'),
        validateQuestion,
        questionController.updateQuestion
    );

module.exports = router;