import { Pool } from 'pg';
import dotenv from 'dotenv';

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

export default {
  query: (queryText, params) => pool.query(queryText, params),
};
