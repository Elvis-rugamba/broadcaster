require('dotenv').config();
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

function validateUser(user) {
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

function validateLogin(user) {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),

    password: Joi.string()
      .required(),
  });

  return schema.validate(user);
}

exports.user_get_all = async (req, res, next) => {
  const users = User.all;
  res.status(200).json({
    status: 200,
    data: users,
  });
};

exports.user_signup = async (req, res) => {
  const users = User.all;
  const { error } = await validateUser(req.body);
  if (error) {
    return res.status(405).json({
      status: 405,
      error: error.details[0].message,
    });
  }

  const email = await User.findByEmail(req.body.email);
  const username = await User.findByUserName(req.body.username);
  const phoneNumber = await User.findByPhoneNumber(req.body.phoneNumber);

  if (email) {
    return res.status(401).json({
      status: 401,
      error: 'Email already used',
    });
  }
  if (username) {
    return res.status(401).json({
      status: 401,
      error: 'Username already used',
    });
  }
  if (phoneNumber) {
    return res.status(401).json({
      status: 401,
      error: 'Phone number already used',
    });
  }
  if (req.body.password !== req.body.password2) {
    return res.status(401).json({
      status: 401,
      error: 'Password mismatch',
    });
  }

  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      res.status(500).json({
        status: 500,
        error: err,
      });
    } else {
      const max = Math.max(...users.map((user) => user.id));
      const user = {
        id: max + 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        username: req.body.username,
        password: hash,
        type: req.body.type,
        createdOn: new Date().toISOString(),
      };
      User.create(user);
      jwt.sign(
        {
          userId: user.id,
          email: user.email,
          username: user.username,
          firstname: user.firstname,
          lastname: user.lastname,
          userType: user.type,
        },
        process.env.JWT_KEY,
        {
          expiresIn: '1h',
        },
        (er, token) => {
          if (er) {
            return res.status(500).json({
              status: 500,
              error: er,
            });
          }
          res.status(200).json({
            status: 200,
            message: 'User created successfully',
            data: { token: token },
          });
        },
      );
    }
  });
};

exports.user_signin = async (req, res) => {
  const { error } = await validateLogin(req.body);
  if (error) {
    return res.status(405).json({
      status: 405,
      error: error.details[0].message,
    });
  }

  const user = await User.findByEmail(req.body.email);
  if (!user) {
    return res.status(401).json({
      status: 401,
      error: 'Incorrect Email or Password',
    });
  }

  const match = await bcrypt.compare(req.body.password, user.password);
  if (match) {
    jwt.sign(
      {
        userId: user.id,
        email: user.email,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        userType: user.type,
      },
      process.env.JWT_KEY,
      {
        expiresIn: '1h',
      },
      (er, token) => {
        if (er) {
          return res.status(500).json({
            status: 500,
            error: er,
          });
        }
        res.status(200).json({
          status: 200,
          message: 'User is successfully logged in',
          data: { token: token },
        });
      },
    );
  } else {
    return res.status(401).json({
      status: 401,
      error: 'Incorrect Email or Password',
    });
  }
};

exports.user_delete = async (req, res) => {
  const id = req.params.userId;
  const user = await User.findById(id);
  if (!user) {
    return res.status(400).json({
      status: 400,
      error: 'The user with the given ID not found',
    });
  }

  const deletedUser = await User.delete(user);
  res.status(200).json({
    status: 200,
    data: [{
      id: deletedUser.id,
      message: 'User record has been deleted',

    }],
  });
};