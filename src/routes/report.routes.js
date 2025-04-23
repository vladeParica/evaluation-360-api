const express = require('express');
const reportController = require('../controllers/report.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Report:
 *       type: object
 *       properties:
 *         employee:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             name:
 *               type: string
 *             position:
 *               type: string
 *             department:
 *               type: string
 *         evaluations:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               score:
 *                 type: number
 *               feedback:
 *                 type: string
 *         averageScore:
 *           type: number
 *         strengths:
 *           type: array
 *           items:
 *             type: string
 *         areasForImprovement:
 *           type: array
 *           items:
 *             type: string
 */

router.use(authMiddleware.protect);

/**
 * @swagger
 * /api/reports/employee/{id}:
 *   get:
 *     summary: Obtener reporte de un empleado
 *     tags: [Reports]
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
 *         description: Reporte del empleado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Report'
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Empleado no encontrado
 */
router.get('/employee/:id',
    authMiddleware.restrictTo('admin', 'manager'),
    reportController.getEmployeeReport
);

/**
 * @swagger
 * /api/reports/department/{id}:
 *   get:
 *     summary: Obtener reporte de un departamento
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del departamento
 *     responses:
 *       200:
 *         description: Reporte del departamento
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 department:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                 employees:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Report'
 *                 averageScore:
 *                   type: number
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Departamento no encontrado
 */
router.get('/department/:id',
    authMiddleware.restrictTo('admin', 'manager'),
    reportController.getDepartmentReport
);

module.exports = router;