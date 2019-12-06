import db from '../db/config';
import query from '../db/queries';

class User {
  async create({
    firstname, lastname, email, phoneNumber, username, password, type,
  }) {
    const createdUser = await db.query(query.createUser,
      [firstname, lastname, email, phoneNumber, username, password, type]);
    return createdUser;
  }

  async checkEmailExists(email) {
    const { rows } = await db.query(query.emailExist, [email]);
    return rows[0];
  }

  async checkPhoneNumberExists(phoneNumber) {
    const { rows } = await db.query(query.phoneNumberExist, [phoneNumber]);
    return rows[0];
  }

  async checkUserNameExists(userName) {
    const { rows } = await db.query(query.userNameExist, [userName]);
    return rows[0];
  }

  async findByEmail(email) {
    const { rows } = await db.query(query.findUserByEmail, [email]);
    console.log(rows);
    return rows[0];
  }
}

export default new User();
