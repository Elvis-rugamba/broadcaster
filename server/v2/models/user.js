import pool from '../db/config';
import query from '../db/queries';

class User {
  static async getAll() {
    try {
      const { rows } = await pool.query(query.findUsers);
      return rows;
    } catch (error) {
      console.log(error);
    }
  }

  static async create(user) {
    try {
      const lastInsertedId = await pool.query(query.createUser, [...user]);
      return lastInsertedId;
    } catch (error) {
      console.log(error);
    }
  }

  static async findById(id) {
    try {
      const { rows } = await pool.query(query.findUserByid, [id]);
      return rows;
    } catch (error) {
      console.log(error);
    }
  }

  static async findByEmail(email) {
    try {
      const { rows } = await pool.query(query.findUserByEmail, [email]);
      console.log(rows);
      return rows;
    } catch (error) {
      console.log(error);
    }
  }

  static async findByUserName(userName) {
    try {
      const { rows } = await pool.query(query.findUserByUserName, [userName]);
      return rows;
    } catch (error) {
      console.log(error);
    }
  }

  static async findByPhoneNumber(phonenumber) {
    try {
      const { rows } = await pool.query(query.findUserByPhoneNumber, [phonenumber]);
      return rows;
    } catch (error) {
      console.log(error);
    }
  }
}

export default User;
