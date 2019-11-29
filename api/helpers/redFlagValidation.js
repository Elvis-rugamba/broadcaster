import Joi from '@hapi/joi';

class RedFlagValidation {
  static validateRedFlag(redFlag) {
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

    return schema.validate(redFlag);
  }

  static validateComment(comment) {
    const schema = Joi.object({
      comment: Joi.string()
        .min(3)
        .max(30)
        .required(),
    });

    return schema.validate(comment);
  }

  static validateLoction(location) {
    const schema = Joi.object({
      location: Joi.string()
        .required()
        .pattern(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/),
    });

    return schema.validate(location);
  }

  static validateStatus(status) {
    const schema = Joi.object({
      status: Joi.string()
        .required()
        .valid('draft', 'under investigation', 'rejected', 'resolved'),
    });

    return schema.validate(status);
  }
}

export default RedFlagValidation;