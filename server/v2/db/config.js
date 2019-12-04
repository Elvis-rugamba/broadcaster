import { Pool } from 'pg';
import dotenv from 'dotenv';
import query from './queries';

dotenv.config();

const isTesting = process.env.NODE_ENV === 'testing';
const isProduction = process.env.NODE_ENV === 'production';
let connectionString;

if (isTesting) {
  connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_TEST_DATABASE}`;
} else if (isProduction) {
  connectionString = process.env.HEROKU_URI;
} else {
  connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
}

const pool = new Pool({
  connectionString: connectionString,
});

(async () => {
  try {
    const res = await pool.query('SELECT * FROM testusers');
    console.log(res.rows[0]);
    await pool.end();
  } catch (err) {
    console.log(err.stack);
  }
})();

export default pool;