import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../db/config';
import query from '../db/queries';

dotenv.config();

export default async (req, res, next) => {
  if (!req.headers.token) {
    return res.status(400).json({
      status: 400,
      error: 'Token not provided',
    });
  }


  const [, token] = req.headers.token.split(' ');

  try {
    const decoded = await jwt.verify(token, process.env.JWT_KEY);
    const { rows } = await db.query(query.findUserByid, [decoded.userId]);
    if (!rows[0]) {
      return res.status(403).json({
        status: 403,
        error: 'Invalid token, you are not allowed to access resources',
      });
    }
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      status: 403,
      error: 'Invalid token, you are not allowed to access resources',
    });
  }
};