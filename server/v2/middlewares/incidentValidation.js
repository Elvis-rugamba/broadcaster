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

  static incidentId(req, res, next) {
    const schema = Joi.object({
      redFlagId: Joi.number()
        .integer()
        .positive()
        .min(1),
    });

    const { error } = schema.validate(req.params);
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