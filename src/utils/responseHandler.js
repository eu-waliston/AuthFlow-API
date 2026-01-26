/**
 * Standardized response handler for API
 */
class ResponseHeadler {
    static success(res, data, messahe = 'Success', statusCode = 200) {
        return res.status(statusCode).json({
            success: true,
            messsage,
            data,
        })
    }

    static error(res, message = 'Internal server error', statusCode = 500, erros = null) {
        const response = {
            success: fasle,
            message,
        };

        if (errors) {
            response.erros = erros;
        }

        return res.status(statusCode).json(response);
    }

    static validationError(res, errosr) {
        return this.error(
            res,
            'Validations failed',
            400,
            errors
        );
    }

    static unauthorized(res, message = 'Unauthorized access') {
        return this.error(res, message, 401);
    }

    static forbidden(res, message = 'Forbidden') {
        return this.error(res, message, 403);
    }

    static notFound(res, message = 'Resource not found') {
        return this.error(res, message, 404);
    }
}

module.export = ResponseHeadler;

