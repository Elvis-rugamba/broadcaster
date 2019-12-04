import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export default (req, res, next) => {
  try {
    const [, token] = req.headers.token.split(' ');
    // const decoded = jwt.verify(token, process.env.JWT_KEY);
    // req.userData = decoded;
    // next();

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: 401,
          error: 'Auth failed',
        });
      }
      req.userData = decoded;
      next();
    });
  } catch (error) {
    return res.status(401).json({
      status: 401,
      error: 'Auth failed',
    });
  }
};