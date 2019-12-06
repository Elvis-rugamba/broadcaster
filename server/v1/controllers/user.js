import bcrypt from 'bcrypt';
import User from '../models/user';
import UserValidation from '../helpers/userValidation';
import GenerateToken from '../helpers/generateToken';

class UserController {
  static userSignup(req, res) {
    const { error } = UserValidation.validateUser(req.body);
    if (error) {
      return res.status(401).json({
        status: 401,
        error: error.details[0].message,
      });
    }

    const email = User.findByEmail(req.body.email);
    const username = User.findByUserName(req.body.username);
    const phoneNumber = User.findByPhoneNumber(req.body.phoneNumber);

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
        const user = {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          username: req.body.username,
          password: hash,
          type: req.body.type,
          createdOn: new Date().toISOString(),
        };
        const id = User.create(user);
        user.id = id;
        const token = GenerateToken.getToken(user);
        res.status(200).json({
          status: 200,
          message: 'User created successfully',
          data: { token: token },
        });
      }
    });
  }

  static async userSignin(req, res) {
    const { error } = UserValidation.validateLogin(req.body);
    if (error) {
      return res.status(401).json({
        status: 401,
        error: error.details[0].message,
      });
    }

    const user = User.findByEmail(req.body.email);
    if (!user) {
      return res.status(401).json({
        status: 401,
        error: 'Incorrect Email or Password',
      });
    }

    const match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
      const token = GenerateToken.getToken(user);
      res.status(200).json({
        status: 200,
        message: 'User is successfully logged in',
        data: { token: token },
      });
    } else {
      return res.status(401).json({
        status: 401,
        error: 'Incorrect Email or Password',
      });
    }
  }
}

export default UserController;
