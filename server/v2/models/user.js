import db from '../db/config';
import query from '../db/queries';

class User {
  constructor() {
    db.query(query.createUsersTable);
  }

  async getAll() {
    try {
      const { rows } = await db.query(query.findUsers);
      return rows[0];
    } catch (error) {
      console.log(error);
    }
  }

  async create(user) {
    try {
      const createdUser = await db.query(query.createUser,
        [user.firstname, user.lastname, user.email, user.phonenumber, user.username, user.password, user.type]);
      return createdUser;
    } catch (error) {
      console.log(error);
    }
  }

  async findById(id) {
    try {
      const { rows } = await db.query(query.findUserByid, [id]);
      return rows[0];
    } catch (error) {
      console.log(error);
    }
  }

  async findByEmail(email) {
    try {
      const { rows } = await db.query(query.findUserByEmail, [email]);
      return rows[0];
    } catch (error) {
      console.log(error);
    }
  }

  async findByUserName(userName) {
    try {
      const { rows } = await db.query(query.findUserByUserName, [userName]);
      return rows[0];
    } catch (error) {
      console.log(error);
    }
  }

  async findByPhoneNumber(phonenumber) {
    try {
      const { rows } = await db.query(query.findUserByPhoneNumber, [phonenumber]);
      return rows[0];
    } catch (error) {
      console.log(error);
    }
  }

  async checkEmailExists(email) {
    try {
      const { rows } = await db.query(query.emailExist, [email]);
      return rows[0];
    } catch (error) {
      console.log(error);
    }
  }

  async checkPhoneNumberExists(phoneNumber) {
    try {
      const { rows } = await db.query(query.phoneNumberExist, [phoneNumber]);
      return rows[0];
    } catch (error) {
      console.log(error);
    }
  }

  async checkUserNameExists(userName) {
    try {
      const { rows } = await db.query(query.userNameExist, [userName]);
      return rows[0];
    } catch (error) {
      console.log(error);
    }
  }
}

export default new User();
