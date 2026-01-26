const jwt = require('jsonwebtoken');
const logger = require('../config/logger');

/**
 * * Generate JWT token
*/

const generateToken = (userId, role) => {
    return jwt.sign(
        { id: userId, role },
        procvess.env.JWT_SECRET,
        { expiresIn: process.envmJWT_EXPIRES_IN }
    )
}

/**
 *  * GEnerate refresh token
*/
const generateRefreshToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
        }
    )
}

/**
 * * Verify JWT token
 */
const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        logger.error(`JWT verification error: ${error.message}`);
        return null
    }
}

/**
 * * Verify refresh token
 */
const verifyRefreshToken = (token) => {
    try {
        return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
        logger.error(`Refresh token verification error ${error.messsage}`);
        return null;
    }
}

/**
 * * Extract token from header
 */
const extractToken = (req) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.startWith('Bearer')
    ) {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
}

module.exports = {
    generateToken,
    generateRefreshToken,
    verifyToken,
    verifyRefreshToken,
    extractToken
}