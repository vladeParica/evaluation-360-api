const { body } = require('express-validator');
const validateResult = require('../../utils/validateResult');

exports.validateEmployee = [
    body('userId')
        .notEmpty().withMessage('El ID de usuario es requerido')
        .isMongoId().withMessage('ID de usuario no válido'),
    body('firstName')
        .notEmpty().withMessage('El nombre es requerido')
        .isString().withMessage('El nombre debe ser texto'),
    body('lastName')
        .notEmpty().withMessage('El apellido es requerido')
        .isString().withMessage('El apellido debe ser texto'),
    body('position')
        .notEmpty().withMessage('El cargo es requerido')
        .isString().withMessage('El cargo debe ser texto'),
    body('department')
        .notEmpty().withMessage('El departamento es requerido')
        .isString().withMessage('El departamento debe ser texto'),
    (req, res, next) => validateResult(req, res, next)
];