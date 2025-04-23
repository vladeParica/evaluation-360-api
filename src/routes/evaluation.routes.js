const express = require('express');
const evaluationController = require('../controllers/evaluation.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { validateEvaluation, validateSubmit } = require('../middlewares/validators/evaluation.validator');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Evaluation:
 *       type: object
 *       required:
 *         - employeeId
 *         - evaluatorId
 *         - startDate
 *         - endDate
 *       properties:
 *         employeeId:
 *           type: string
 *           description: ID del empleado a evaluar
 *         evaluatorId:
 *           type: string
 *           description: ID del evaluador
 *         startDate:
 *           type: string
 *           format: date
 *           description: Fecha de inicio de la evaluación
 *         endDate:
 *           type: string
 *           format: date
 *           description: Fecha de fin de la evaluación
 *         status:
 *           type: string
 *           enum: [pending, in_progress, completed]
 *           description: Estado de la evaluación
 */

router.use(authMiddleware.protect);

/**
 * @swagger
 * /api/evaluations:
 *   get:
 *     summary: Obtener todas las evaluaciones
 *     tags: [Evaluations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de evaluaciones
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
 *                     evaluations:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Evaluation'
 *       403:
 *         description: No autorizado
 */
router.route('/')
    .get(evaluationController.getAllEvaluations)

    /**
     * @swagger
     * /api/evaluations:
     *   post:
     *     summary: Crear una nueva evaluación
     *     tags: [Evaluations]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Evaluation'
     *     responses:
     *       201:
     *         description: Evaluación creada exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Evaluation'
     *       400:
     *         description: Error en los datos proporcionados
     *       403:
     *         description: No autorizado
     */
    .post(
        authMiddleware.restrictTo('admin', 'manager'),
        validateEvaluation,
        evaluationController.createEvaluation
    );

/**
 * @swagger
 * /api/evaluations/{id}:
 *   get:
 *     summary: Obtener una evaluación por ID
 *     tags: [Evaluations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la evaluación
 *     responses:
 *       200:
 *         description: Datos de la evaluación
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
 *                     evaluation:
 *                       $ref: '#/components/schemas/Evaluation'
 *       404:
 *         description: Evaluación no encontrada
 */
router.route('/:id')
    .get(evaluationController.getEvaluation)

    /**
     * @swagger
     * /api/evaluations/{id}:
     *   put:
     *     summary: Actualizar una evaluación
     *     tags: [Evaluations]
     *     security:
     *       - bearerAuth: []
     *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la evaluación
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Evaluation'
     *     responses:
     *       200:
     *         description: Evaluación actualizada exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Evaluation'
     *       400:
     *         description: Error en los datos proporcionados
     *       403:
     *         description: No autorizado
     *       404:
     *         description: Evaluación no encontrada
     */
    .put(
        authMiddleware.restrictTo('admin', 'manager'),
        validateEvaluation,
        evaluationController.updateEvaluation
    );

/**
 * @swagger
 * /api/evaluations/{id}/submit:
 *   post:
 *     summary: Enviar una evaluación
 *     tags: [Evaluations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la evaluación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - answers
 *             properties:
 *               answers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - questionId
 *                     - score
 *                   properties:
 *                     questionId:
 *                       type: string
 *                     score:
 *                       type: number
 *                       minimum: 1
 *                       maximum: 5
 *     responses:
 *       200:
 *         description: Evaluación enviada exitosamente
 *       400:
 *         description: Error en los datos proporcionados
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Evaluación no encontrada
 */
router.post(
    '/:id/submit',
    authMiddleware.restrictTo('admin'),
    validateSubmit,
    evaluationController.submitEvaluation
);

module.exports = router;