const express = require('express');
const employeeController = require('../controllers/employee.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { validateEmployee } = require('../middlewares/validators/employee.validator');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       required:
 *         - userId
 *         - firstName
 *         - lastName
 *         - position
 *         - department
 *       properties:
 *         userId:
 *           type: string
 *           description: ID del usuario asociado
 *         firstName:
 *           type: string
 *           description: Nombre del empleado
 *         lastName:
 *           type: string
 *           description: Apellido del empleado
 *         position:
 *           type: string
 *           description: Cargo del empleado
 *         department:
 *           type: string
 *           description: Departamento del empleado
 *         hireDate:
 *           type: string
 *           format: date
 *           description: Fecha de contratación
 */

router.use(authMiddleware.protect);

/**
 * @swagger
 * /api/employees:
 *   get:
 *     summary: Obtener todos los empleados
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de empleados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     employees:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Employee'
 *       403:
 *         description: No autorizado
 */
router.route('/')
    .get(authMiddleware.restrictTo('admin', 'manager'), employeeController.getAllEmployees)

    /**
     * @swagger
     * /api/employees:
     *   post:
     *     summary: Crear un nuevo empleado
     *     tags: [Employees]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Employee'
     *     responses:
     *       201:
     *         description: Empleado creado exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Employee'
     *       400:
     *         description: Error en los datos proporcionados
     *       403:
     *         description: No autorizado
     */
    .post(authMiddleware.restrictTo('admin'), validateEmployee, employeeController.createEmployee);

/**
 * @swagger
 * /api/employees/{id}:
 *   get:
 *     summary: Obtener un empleado por ID
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del empleado
 *     responses:
 *       200:
 *         description: Datos del empleado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     employee:
 *                       $ref: '#/components/schemas/Employee'
 *       404:
 *         description: Empleado no encontrado
 */
router.route('/:id')
    .get(employeeController.getEmployee)

    /**
     * @swagger
     * /api/employees/{id}:
     *   put:
     *     summary: Actualizar un empleado
     *     tags: [Employees]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID del empleado
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Employee'
     *     responses:
     *       200:
     *         description: Empleado actualizado exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Employee'
     *       400:
     *         description: Error en los datos proporcionados
     *       403:
     *         description: No autorizado
     *       404:
     *         description: Empleado no encontrado
     */
    .put(
        authMiddleware.restrictTo('admin', 'manager'),
        validateEmployee,
        employeeController.updateEmployee
    );

module.exports = router;