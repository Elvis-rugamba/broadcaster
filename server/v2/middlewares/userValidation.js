import Joi from '@hapi/joi';

class UserValidation {
  static validateUser(req, res, next) {
    const schema = Joi.object({
      firstname: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
          'string.base': '{{#label}} must be a string',
          'string.min': '{{#label}} length must be at least {{#limit}} characters long',
          'string.max': '{{#label}} length must be less than or equal to {{#limit}} characters long',
          'any.required': '{{#label}} is required',
        }),

      lastname: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
          'string.base': '{{#label}} must be a string',
          'string.min': '{{#label}} length must be at least {{#limit}} characters long',
          'string.max': '{{#label}} length must be less than or equal to {{#limit}} characters long',
          'any.required': '{{#label}} is required',
        }),

      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
        .messages({
          'string.base': '{{#label}} must be a string',
          'string.email': '{{#label}} must be valid email',
          'any.required': '{{#label}} is required',
        }),

      phoneNumber: Joi.string()
        .required()
        .messages({
          'string.base': '{{#label}} must be a string',
          'any.required': '{{#label}} is required',
        }),

      username: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
          'string.base': '{{#label}} must be a string',
          'string.min': '{{#label}} length must be at least {{#limit}} characters long',
          'string.max': '{{#label}} length must be less than or equal to {{#limit}} characters long',
          'any.required': '{{#label}} is required',
        }),

      password: Joi.string()
        .min(6)
        .max(64)
        .required()
        .pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .messages({
          'string.base': '{{#label}} must be a string',
          'string.min': '{{#label}} length must be at least {{#limit}} characters long',
          'string.max': '{{#label}} length must be less than or equal to {{#limit}} characters long',
          'any.required': '{{#label}} is required',
          'string.pattern.base': '{{#label}} must include at least a number and a capital letter',
        }),

      password2: Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .messages({
          'string.base': '{{#label}} must be a string',
          'any.only': '{{#label}} must match {{#valids}}',
          'any.required': '{{#label}} is required',
        }),

      type: Joi.string()
        .required()
        .valid('admin', 'user')
        .messages({
          'string.base': '{{#label}} must be a string',
          'any.only': '{{#label}} must be {if(#valids.length == 1, "", "one of ")}{{#valids}}',
          'any.required': '{{#label}} is required',
        }),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(401).json({
        status: 401,
        error: error.message,
      });
    }

    next();
  }

  static validateLogin(req, res, next) {
    const schema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
        .messages({
          'string.base': '{{#label}} must be a string',
          'string.email': '{{#label}} must be valid email',
          'any.required': '{{#label}} is required',
        }),

      password: Joi.string()
        .required()
        .messages({
          'string.base': '{{#label}} must be a string',
          'any.required': '{{#label}} is required',
        }),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(401).json({
        status: 401,
        error: error.message,
      });
    }

    next();
  }
}

export default UserValidation;