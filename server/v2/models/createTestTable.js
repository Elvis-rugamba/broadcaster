import db from '../db/config';
import query from '../db/queries';
import user from '../test/data/userData';

const createTable = async () => {
  try {
    await db.query(query.createTestUsersTable);
    await db.query(query.createUser,
      [user.userRegister.firstname, user.userRegister.lastname, user.userRegister.email, user.userRegister.phoneNumber,
        user.userRegister.username, user.userRegister.password, user.userRegister.type]);
  } catch (error) {
    console.log(error);
  }
};

createTable();

export default createTable;