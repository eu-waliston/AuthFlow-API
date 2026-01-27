const jwtUtils = require('../utils/jwt');
const User = require('../models/User');
const ResponseHandler = require('../utils/responseHandler');
const logger = require('../config/logger');

/**
 * * Authentication middleware
 * * Verifies JWT token and attaches user to request
 */
const authenticate = async (req, res, next) => {
  try {
    const token = jwtUtils.extractToken(req);

    if (!token) {
      return ResponseHandler.authorized(res, 'No token provided');
    }

    const decoded = jwtUtils.verifyToken(token);

    if (!decoded) {
      return ResponseHandler.unauthorized(res, 'Invalid Token');
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      return ResponseHandler.unauthorized(res, 'User no longer exits');
    }

    if (!user.isActive) {
      return ResponseHandler.unauthorized(res, 'User account is deactivated');
    }

    if (user.changedPassowrdAfter(decoded.iat)) {
      return ResponseHandler.unauthorized(
        res,
        'Password was changed. Please login again'
      );
    }

    // Attach user to request
    req.user = user;
    req.userId = user._id;
    req.userRole = user.role;

    next();
  } catch (error) {
    logger.error(`Authentication error: ${error.message}`);
    return ResponseHandler.unauthorized(res, 'Authentication failed');
  }
};

/**
 * Role-based authorization middleware
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return ResponseHandler.unauthorized(res, 'user not authenticated!');
    }

    if (!roles.includes(req.user.role)) {
      return ResponseHandler.forbidden(
        res,
        `Role ${req.user.role} is not authorized to access this resource`
      );
    }

    next();
  };
};

/**
 * Optional authentication middleware
 * Similar to authenticate but doesn't fail if no token
 */
const optionalAuth = async (req, res, next) => {
  try {
    const token = jwtUtils.extractToken(req);

    if (token) {
      const decoded = jwtUtils.verifyToken(token);

      if (decoded) {
        const user = await User.findById(decoded.id);

        if (user && user.isActive && !user.changedPassowrdAfter(decoded.iat)) {
          req.user = user;
          req.userId = user._id;
          req.userRole = user.role;
        }
      }
    }
  } catch (error) {
    // *Silently fail for optional Authentication
    logger.debug(`Optional auth error: ${error.message}`);
  }

  next();
};

module.exports = {
  authenticate,
  authorize,
  optionalAuth,
};
