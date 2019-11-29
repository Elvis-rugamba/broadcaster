import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

class GenerateToken {
  static getToken(id, user) {
    const payload = {
      userId: id,
      email: user.email,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      userType: user.type,
    };
    return jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1h' });
  }
}

export default GenerateToken;