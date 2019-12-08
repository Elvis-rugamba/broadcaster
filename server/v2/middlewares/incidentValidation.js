import Joi from '@hapi/joi';

class IncidentValidation {
  static validateIncident(req, res, next) {
    const schema = Joi.object({
      title: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
          'string.base': '{{#label}} must be a string',
          'string.min': '{{#label}} length must be at least {{#limit}} characters long',
          'string.max': '{{#label}} length must be less than or equal to {{#limit}} characters long',
          'any.required': '{{#label}} is required',
        }),

      type: Joi.string()
        .required()
        .valid('red-flag', 'intervention')
        .required()
        .messages({
          'string.base': '{{#label}} must be a string',
          'any.only': '{{#label}} must be {if(#valids.length == 1, "", "one of ")}{{#valids}}',
          'any.required': '{{#label}} is required',
        }),

      comment: Joi.string()
        .min(3)
        .max(250)
        .required()
        .messages({
          'string.base': '{{#label}} must be a string',
          'string.min': '{{#label}} length must be at least {{#limit}} characters long',
          'string.max': '{{#label}} length must be less than or equal to {{#limit}} characters long',
          'any.required': '{{#label}} is required',
        }),

      location: Joi.string()
        .required()
        .pattern(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/)
        .messages({
          'string.base': '{{#label}} must be a string',
          'any.required': '{{#label}} is required',
          'string.pattern.base': '{{#label}} must be (lat, long) and lat must not be > 90 and long must not be > 180',
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

  static incidentId(req, res, next) {
    const schema = Joi.object({
      redFlagId: Joi.number()
        .integer()
        .positive()
        .min(1)
        .messages({
          'number.base': '{{#label}} must be a number',
          'string.min': '{{#label}} length must be at least {{#limit}} characters long',
          'number.integer': '{{#label}} must be an integer',
          'number.positive': '{{#label}} must be a positive number',
          'number.unsafe': '{{#label}} must be a safe number',
          'any.required': '{{#label}} is required',
        }),
    });

    const { error } = schema.validate(req.params);
    if (error) {
      return res.status(401).json({
        status: 401,
        error: error.message,
      });
    }

    next();
  }

  static validateLoction(req, res, next) {
    const schema = Joi.object({
      location: Joi.string()
        .required()
        .pattern(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/)
        .messages({
          'string.base': '{{#label}} must be a string',
          'any.required': '{{#label}} is required',
          'string.pattern.base': '{{#label}} must be (lat, long) and lat must not be > 90 and long must not be > 180',
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

  static validateComment(req, res, next) {
    const schema = Joi.object({
      comment: Joi.string()
        .min(3)
        .max(250)
        .required()
        .messages({
          'string.base': '{{#label}} must be a string',
          'string.min': '{{#label}} length must be at least {{#limit}} characters long',
          'string.max': '{{#label}} length must be less than or equal to {{#limit}} characters long',
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

  static validateStatus(req, res, next) {
    const schema = Joi.object({
      status: Joi.string()
        .required()
        .valid('draft', 'under investigation', 'rejected', 'resolved')
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
}

export default IncidentValidation;