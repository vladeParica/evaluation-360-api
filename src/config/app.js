const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const errorMiddleware = require('../middlewares/error.middleware');

const authRoutes = require('../routes/auth.routes');
const employeeRoutes = require('../routes/employee.routes');
const evaluationRoutes = require('../routes/evaluation.routes');
const questionRoutes = require('../routes/question.routes');
const reportRoutes = require('../routes/report.routes');
const { apiLimiter, authLimiter} = require("../middlewares/rateLimit.middleware");

const app = express();

app.use(helmet());
app.use(cors());

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api/', apiLimiter);
app.use('/api/auth/', authLimiter);

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/evaluations', evaluationRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/reports', reportRoutes);

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'success', message: 'API operativa' });
});

app.all('*', (req, res, next) => {
    const err = new Error(`Ruta ${req.originalUrl} no encontrada`);
    err.statusCode = 404;
    err.status = 'fail';
    next(err);
});

app.use(errorMiddleware);

module.exports = app;