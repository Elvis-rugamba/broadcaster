import Joi from '@hapi/joi';

class UserValidation {
  static validateUser(req, res, next) {
    const schema = Joi.object({
      firstname: Joi.string()
        .min(3)
        .max(30)
        .required(),

      lastname: Joi.string()
        .min(3)
        .max(30)
        .required(),

      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),

      phoneNumber: Joi.string()
        .required(),

      username: Joi.string()
        .min(3)
        .max(30)
        .required(),

      password: Joi.string()
        .min(6)
        .max(64)
        .required()
        .pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),

      password2: Joi.string()
        .valid(Joi.ref('password'))
        .required(),

      type: Joi.string()
        .min(3)
        .max(30)
        .required()
        .valid('admin', 'user'),
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

  static validateLogin(req, res, next) {
    const schema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),

      password: Joi.any()
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
}

export default UserValidation;