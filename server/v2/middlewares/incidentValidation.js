import Joi from '@hapi/joi';

class IncidentValidation {
  static validateIncident(req, res, next) {
    const schema = Joi.object({
      title: Joi.string()
        .min(3)
        .max(30)
        .required(),

      type: Joi.string()
        .required()
        .valid('red-flag', 'intervention'),

      comment: Joi.string()
        .min(3)
        .max(30)
        .required(),

      location: Joi.string()
        .required()
        .pattern(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(401).json({
        status: 401,
        error: error.details[0].message,
      });
    }

    next();
  }

  static validateComment(req, res, next) {
    const schema = Joi.object({
      comment: Joi.string()
        .min(3)
        .max(30)
        .required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(401).json({
        status: 401,
        error: error.details[0].message,
      });
    }

    next();
  }

  static validateLoction(location) {
    const schema = Joi.object({
      location: Joi.string()
        .required()
        .pattern(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/),
    });

    return schema.validate(location);
  }

  static validateStatus(req, res, next) {
    const schema = Joi.object({
      status: Joi.string()
        .required()
        .valid('draft', 'under investigation', 'rejected', 'resolved'),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(401).json({
        status: 401,
        error: error.details[0].message,
      });
    }

    next();
  }
}

export default IncidentValidation;