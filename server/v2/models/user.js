import db from '../db/config';
import query from '../db/queries';

class User {
  static async getAll() {
    try {
      const { rows } = await db.query(query.findUsers);
      return rows[0];
    } catch (error) {
      console.log(error);
    }
  }

  static async create(user) {
    try {
      const createdUser = await db.query(query.createUser,
        [user.firstname, user.lastname, user.email, user.phonenumber, user.username, user.password, user.type]);
      return createdUser;
    } catch (error) {
      console.log(error);
    }
  }

  static async findById(id) {
    try {
      const { rows } = await db.query(query.findUserByid, [id]);
      return rows[0];
    } catch (error) {
      console.log(error);
    }
  }

  static async findByEmail(email) {
    try {
      const { rows } = await db.query(query.findUserByEmail, [email]);
      return rows[0];
    } catch (error) {
      console.log(error);
    }
  }

  static async findByUserName(userName) {
    try {
      const { rows } = await db.query(query.findUserByUserName, [userName]);
      return rows[0];
    } catch (error) {
      console.log(error);
    }
  }

  static async findByPhoneNumber(phonenumber) {
    try {
      const { rows } = await db.query(query.findUserByPhoneNumber, [phonenumber]);
      return rows[0];
    } catch (error) {
      console.log(error);
    }
  }

  static async checkEmailExists(email) {
    try {
      const { rows } = await db.query(query.emailExist, [email]);
      return rows[0];
    } catch (error) {
      console.log(error);
    }
  }

  static async checkPhoneNumberExists(phoneNumber) {
    try {
      const { rows } = await db.query(query.phoneNumberExist, [phoneNumber]);
      return rows[0];
    } catch (error) {
      console.log(error);
    }
  }

  static async checkUserNameExists(userName) {
    try {
      const { rows } = await db.query(query.userNameExist, [userName]);
      return rows[0];
    } catch (error) {
      console.log(error);
    }
  }
}

export default User;
