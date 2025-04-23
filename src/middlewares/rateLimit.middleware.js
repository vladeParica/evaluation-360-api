const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100
});

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5
});

module.exports = {
    apiLimiter,
    authLimiter
};