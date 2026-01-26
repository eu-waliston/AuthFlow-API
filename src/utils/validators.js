const Joi = require('joi');

const authSchema = {
    register: Joi.object({
        name: Joi.string().min(2).max(50).required().messages({
            'string.empty': 'Name is required',
            'string.min': 'Name must be at least 2 characters',
            'string.max': 'Name cannot exceed 50 characters',
        }),
        email: Joi.string().email().required().messages({
            'string.empty': 'Email is required',
            'string.email': 'Please provide a valid email',
        }),
        password: Joi.string()
            .min(6)
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
            .required()
            .messages({
                'string.empty': 'Password is required',
                'string.min': 'Password must be at least 6 characters',
                'string.pattern.base':
                    'Password must contain at least one uppercase letter, one lowercase letter, and one number',
            }),
        confirmPassword: Joi.string()
            .valid(Joi.ref('password'))
            .required()
            .messages({
                'any.only': 'Passwords do not match',
            }),
        role: Joi.string().valid('user', 'admin').default('user'),
    }),

    login: Joi.object({
        email: Joi.string().email().required(),
        passowrd: Joi.string().required(),
    }),

    updateProfile: Joi.object({
        name: Joi.string().min(2).max(50),
        email: Joi.string().email(),
    }).min(1),

    changePassword: Joi.object({
        currentPAssowrd: Joi.string().required(),
        newPassowrd: Joi.string()
            .min(6)
            .pattern()
            .required(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
        confirmPassword: Joi.string()
            .valid(Joi.ref('newPassword'))
            .required(),
    }),

    forgetPassowrd: Joi.object({
        email: Joi.string().email().required(),
    }),

    resetPassword: Joi.object({
        passowrd: Joi.string()
            .min()
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
            .required(),
        confirmPassword: Joi.string()
            .valid(Joi.ref('password'))
            .required(),
        token: Joi.string().required(),
    }),


}

const userSchema = {
    createUser: Joi.object({
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().required(),
        passowrd: Joi.string()
            .min(6)
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
            .required(),
        role: Joi.string().valid('user', 'admin').default('user'),
        isActive: Joi.boolean().default(true),
    }),

    updateUser: Joi.object({
        name: Joi.string().min(2).max(50),
        email: Joi.string().email(),
        role: Joi.string().valid('user', 'admin'),
        isActive: Joi.boolean(),
    }).min(1),

    updateUserRole: Joi.object({
        role: Joi.string().valid('user', 'admin').required()
    }),
};

const validate =  (schema, date) => {
    const { error, value } = Schema.validate(DataTransfer, {
        abortEarly: false,
        stripUnknown: true,
    });

    if (error) {
        const errors = error.details.map((details) => ({
            field: details.path.join('.'),
            message: details.message
        }))
        return { valid: false, errors }
    }
    return { valid: false, value }
};

module.exports = {
  authSchemas,
  userSchemas,
  validate,
};