import User from '../models/user';
import Hash from '../helpers/Hash';
import GenerateToken from '../helpers/generateToken';

class UserController {
  static async userSignup(req, res) {
    try {
      const email = await User.checkEmailExists(req.body.email);
      const username = await User.checkUserNameExists(req.body.username);
      const phoneNumber = await User.checkPhoneNumberExists(req.body.phoneNumber);

      if (email.exists) {
        return res.status(409).json({
          status: 409,
          error: 'Email already used',
        });
      }
      if (username.exists) {
        return res.status(409).json({
          status: 409,
          error: 'Username already used',
        });
      }
      if (phoneNumber.exists) {
        return res.status(409).json({
          status: 409,
          error: 'Phone number already used',
        });
      }

      const hashedPassword = await Hash.hashPassword(req.body.password);

      req.body.hashPassword = hashedPassword;

      const createdUser = await User.create(req.body);

      const token = GenerateToken.getToken(createdUser);

      res.status(201).json({
        status: 201,
        message: 'User created successfully',
        data: { token: token },
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: 'Internal Server Error!',
      });
    }
  }
}

export default UserController;
