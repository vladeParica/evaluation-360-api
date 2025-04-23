const { body } = require('express-validator');
const validateResult = require('../../utils/validateResult');

exports.validateQuestion = [
    body('text')
        .notEmpty().withMessage('El texto de la pregunta es requerido')
        .isString().withMessage('El texto debe ser una cadena'),
    body('category')
        .notEmpty().withMessage('La categoría es requerida')
        .isIn(['leadership', 'communication', 'teamwork', 'technical', 'productivity']).withMessage('Categoría no válida'),
    body('type')
        .optional()
        .isIn(['scale', 'text', 'multiple_choice']).withMessage('Tipo no válido'),
    body('options')
        .optional()
        .isArray().withMessage('Las opciones deben ser un array'),
    body('options.*.value')
        .optional()
        .isNumeric().withMessage('El valor debe ser numérico'),
    body('options.*.text')
        .optional()
        .isString().withMessage('El texto debe ser una cadena'),
    (req, res, next) => validateResult(req, res, next)
];