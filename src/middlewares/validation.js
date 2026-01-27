const { validate } = require('../utils/validators');
const ResponseHandler = require('../utils/responseHandler');

/**
 *Validation middleware factory
 */
const validationRequest = (schema, type = 'body') => {
  return (res, req, next) => {
    const data = req[type];
    const result = validate(schema, data);

    if (!result.valid) {
      return ResponseHandler.validationError(res, result.errors);
    }

    // Replace request data with validated and senitized data
    req[type] = result.value;
    next();
  };
};

module.exports = validationRequest;
