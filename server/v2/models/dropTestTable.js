import db from '../db/config';
import query from '../db/queries';

const dropTable = async () => {
  try {
    await db.query(query.dropUsersTable);
  } catch (error) {
    console.log(error);
  }
};

dropTable();

export default dropTable;