const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('../middlewares/rateLimit.middleware');
const errorMiddleware = require('../middlewares/error.middleware');

const authRoutes = require('../routes/auth.routes');
const employeeRoutes = require('../routes/employee.routes');
const evaluationRoutes = require('../routes/evaluation.routes');
const questionRoutes = require('../routes/question.routes');
// const reportRoutes = require('../routes/report.routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());


app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/evaluations', evaluationRoutes);
app.use('/api/questions',questionRoutes)

app.get('/', (req, res) => {
    res.json({
        message: 'API de Evaluación 360 Grados',
        version: '1.0.0'
    });
});

app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Ruta no encontrada'
    });
});

app.use(errorMiddleware);

module.exports = app;