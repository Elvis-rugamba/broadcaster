import db from '../db/config';
import query from '../db/queries';

class User {
  constructor() {
    db.query(query.createUsersTable);
    db.query(query.createTestUsersTable);
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
