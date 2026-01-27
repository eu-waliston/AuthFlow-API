const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const redis = require('../config/redis');
const logger = require('../config/logger');


/**
 * *Create rate limiter with Redis store
 */
const createLimiter = (windowMs = 15 * 60 * 1000, max = 100) => {
    return rateLimit({
        windowMs,
        max,
        standardHeaders: true,
        logacyHeaders: false,
        store: new RedisStore({
            sendCommand: (...args) => redis.sendCommand(args),
        }),
        headler: (req, res) => {
            logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
            res.status(429).json({
                success: false,
                message: 'Too many requests, please try again later',
            });
        },
    });
};

// *Specific limiters for different routes
const authLimiter = createLimiter(15 * 60 * 1000, 10)
// *^ 10 requests por 15 minutoes
const apiLimiter = createLimiter(15 * 60 * 1000, 100)
// *^ 100 requests por 15 minutoes
const strictLimiter = createLimiter(60 * 1000, 5)
// *^  5 requests per minutoe

module.exports = {
    createLimiter,
    authLimiter,
    apiLimiter,
    strictLimiter,
};
