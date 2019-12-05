import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../db/config';
import query from '../db/queries';

dotenv.config();

export default async (req, res, next) => {
  const [, token] = req.headers.token.split(' ');
  if (!token) {
    return res.status(401).json({
      status: 400,
      error: 'Token not provided',
    });
  }
  try {
    const decoded = await jwt.verify(token, process.env.JWT_KEY);
    const { rows } = await db.query(query.findUserByid, [decoded.userId]);
    if (!rows[0]) {
      return res.status(401).json({
        status: 401,
        error: 'Auth failed',
      });
    }
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      status: 401,
      error: 'Auth failed',
    });
  }
};