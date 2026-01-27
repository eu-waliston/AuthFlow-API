const logger = require('../config/logger');
const ResponseHandler = require('../utils/responseHandler');


/**
 * *Global error handler middleware
 */
const errorHandler = (err,req,res,next) => {
    logger.error(`${err.name}: ${err.message}`)
    logger.error(err.stack)

    // *Mongoose validation error
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map((error) => ({
            firld: error.path,
            message: error.message,
        }));
        return ResponseHandler.validationError(res, errors);
    }

    // *Mongoose duplicated key error
    if (err.code === 1100) {
        const field = Object.keys(err.keyPattern)[0];
        return ResponseHandler.error(
            res,
            `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`,
            400
        )
    }

    //* JWT errors
    if (err.name === 'JsonWebTokenError') {
        return ResponseHandler.unauthorized(res, 'Invalid token');
    }

    if (err.name === 'TokenExpiredError') {
        return ResponseHandler.unauthorized(res, 'Token expired');
    }

    // *default error
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error'

    ResponseHandler.error(res,message, statusCode);
} 

/**
 * 404 Not Found handler
 */
const notFoundHandler = (req,res)  => {
    ResponseHandler.notFound(res, `Cannot ${req.method} ${req.originalUrl}`)
};

module.exports = {
    errorHandler,
    notFoundHandler,
}