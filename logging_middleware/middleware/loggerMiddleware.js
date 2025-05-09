const Log = require('../utils/logger');

const loggingMiddleware = (req, res, next) => {
    const start = Date.now();

    Log('backend', 'info', 'middleware', `Incoming ${req.method} request to ${req.originalUrl}`);

    res.on('finish', () => {
        const duration = Date.now() - start;
        const level = res.statusCode >= 500 ? 'error' : res.statusCode >= 400 ? 'warn' : 'info';
        Log('backend', level, 'middleware', 
            `Completed ${req.method} ${req.originalUrl} - ${res.statusCode} in ${duration}ms`);
    });

    next();
};

module.exports = loggingMiddleware;