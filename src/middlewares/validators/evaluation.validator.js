const { body } = require('express-validator');
const validateResult = require('../../utils/validateResult');

exports.validateEvaluation = [
    body('title')
        .notEmpty().withMessage('El título es requerido')
        .isString().withMessage('El título debe ser texto'),
    body('period.startDate')
        .notEmpty().withMessage('La fecha de inicio es requerida')
        .isISO8601().withMessage('Fecha de inicio no válida'),
    body('period.endDate')
        .notEmpty().withMessage('La fecha de fin es requerida')
        .isISO8601().withMessage('Fecha de fin no válida'),
    body('type')
        .notEmpty().withMessage('El tipo es requerido')
        .isIn(['self', 'peer', 'manager', 'subordinate', 'complete360']).withMessage('Tipo no válido'),
    body('employee')
        .notEmpty().withMessage('El empleado es requerido')
        .isMongoId().withMessage('ID de empleado no válido'),
    body('evaluator')
        .notEmpty().withMessage('El evaluador es requerido')
        .isMongoId().withMessage('ID de evaluador no válido'),
    (req, res, next) => validateResult(req, res, next)
];

exports.validateSubmit = [
    body('responses')
        .isArray().withMessage('Las respuestas deben ser un array')
        .notEmpty().withMessage('Debe enviar al menos una respuesta'),
    body('responses.*.question')
        .notEmpty().withMessage('La pregunta es requerida')
        .isMongoId().withMessage('ID de pregunta no válido'),
    body('responses.*.numericalResponse')
        .optional()
        .isInt({ min: 1, max: 5 }).withMessage('La respuesta numérica debe estar entre 1 y 5'),
    body('responses.*.textResponse')
        .optional()
        .isString().withMessage('La respuesta de texto debe ser una cadena'),
    (req, res, next) => validateResult(req, res, next)
];