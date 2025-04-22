const { body } = require('express-validator');
const validateResult = require('../../utils/validateResult');

exports.validateRegister = [
    body('username')
        .notEmpty().withMessage('El nombre de usuario es requerido')
        .isLength({ min: 3 }).withMessage('El nombre de usuario debe tener al menos 3 caracteres')
        .matches(/^[a-zA-Z0-9_]+$/).withMessage('El nombre de usuario solo puede contener letras, números y guiones bajos'),
    body('email')
        .notEmpty().withMessage('El email es requerido')
        .isEmail().withMessage('Debe ser un email válido'),
    body('password')
        .notEmpty().withMessage('La contraseña es requerida')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('role')
        .optional()
        .isIn(['admin', 'manager', 'employee']).withMessage('Rol no válido'),
    (req, res, next) => validateResult(req, res, next)
];

exports.validateLogin = [
    body('email')
        .notEmpty().withMessage('El email es requerido')
        .isEmail().withMessage('Debe ser un email válido'),
    body('password')
        .notEmpty().withMessage('La contraseña es requerida'),
    (req, res, next) => validateResult(req, res, next)
];