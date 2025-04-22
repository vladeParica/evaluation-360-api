const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000, // 15 minutos por defecto
    max: process.env.RATE_LIMIT_MAX || 100, // 100 solicitudes por ventana
    message: {
        status: 'error',
        message: 'Demasiadas solicitudes desde esta IP, intente nuevamente después'
    }
});

module.exports = limiter;