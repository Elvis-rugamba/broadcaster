import db from '../db/config';
import query from '../db/queries';

const dropTable = async (user) => {
  try {
    await db.query(query.dropTesUsersTable);
  } catch (error) {
    console.log(error);
  }
};

dropTable();

export default dropTable;