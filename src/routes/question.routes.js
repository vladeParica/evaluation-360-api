const express = require('express');
const questionController = require('../controllers/question.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { validateQuestion } = require('../middlewares/validators/question.validator');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Question:
 *       type: object
 *       required:
 *         - text
 *         - category
 *         - type
 *       properties:
 *         text:
 *           type: string
 *           description: Texto de la pregunta
 *         category:
 *           type: string
 *           description: Categoría de la pregunta
 *         type:
 *           type: string
 *           enum: [multiple_choice, rating, text]
 *           description: Tipo de pregunta
 *         options:
 *           type: array
 *           items:
 *             type: string
 *           description: Opciones para preguntas de selección múltiple
 */

router.use(authMiddleware.protect);

/**
 * @swagger
 * /api/questions:
 *   get:
 *     summary: Obtener todas las preguntas
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de preguntas
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
 *                     questions:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Question'
 *       403:
 *         description: No autorizado
 */
router.route('/')
    .get(questionController.getAllQuestions)

    /**
     * @swagger
     * /api/questions:
     *   post:
     *     summary: Crear una nueva pregunta
     *     tags: [Questions]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Question'
     *     responses:
     *       201:
     *         description: Pregunta creada exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Question'
     *       400:
     *         description: Error en los datos proporcionados
     *       403:
     *         description: No autorizado
     */
    .post(
        authMiddleware.restrictTo('admin'),
        validateQuestion,
        questionController.createQuestion
    );

/**
 * @swagger
 * /api/questions/{id}:
 *   get:
 *     summary: Obtener una pregunta por ID
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la pregunta
 *     responses:
 *       200:
 *         description: Datos de la pregunta
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
 *                     question:
 *                       $ref: '#/components/schemas/Question'
 *       404:
 *         description: Pregunta no encontrada
 */
router.route('/:id')
    .get(questionController.getQuestion)

    /**
     * @swagger
     * /api/questions/{id}:
     *   put:
     *     summary: Actualizar una pregunta
     *     tags: [Questions]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID de la pregunta
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Question'
     *     responses:
     *       200:
     *         description: Pregunta actualizada exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Question'
     *       400:
     *         description: Error en los datos proporcionados
     *       403:
     *         description: No autorizado
     *       404:
     *         description: Pregunta no encontrada
     */
    .put(
        authMiddleware.restrictTo('admin'),
        validateQuestion,
        questionController.updateQuestion
    );

module.exports = router;