import User from '../models/user';
import Hash from '../helpers/Hash';
import GenerateToken from '../helpers/generateToken';

class UserController {
  static async userSignup(req, res) {
    try {
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

      const HashedPassword = Hash.hashPassword(req.body.password);

      const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phonenumber: req.body.phoneNumber,
        username: req.body.username,
        password: HashedPassword,
        type: req.body.type,
      };

      const createdUser = await User.create(user);

      const token = GenerateToken.getToken(createdUser);

      res.status(201).json({
        status: 201,
        message: 'User created successfully',
        data: { token: token },
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: error,
      });
    }
  }
}

export default UserController;
