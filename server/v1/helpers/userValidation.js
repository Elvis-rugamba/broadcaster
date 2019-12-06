import Joi from '@hapi/joi';

class UserValidation {
  static validateUser(user) {
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
        .min(6)
        .max(64)
        .required()
        .pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),

      type: Joi.string()
        .min(3)
        .max(30)
        .required(),
    });

    return schema.validate(user);
  }

  static validateLogin(user) {
    const schema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),

      password: Joi.string()
        .required(),
    });

    return schema.validate(user);
  }
}

export default UserValidation;