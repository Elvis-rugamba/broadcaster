import db from '../db/config';
import query from '../db/queries';

const createTable = async () => {
  try {
    await db.query(query.createTestUsersTable);
    await db.query(query.createIncidentsTable);
  } catch (error) {
    console.log(error);
  }
};

createTable();

export default createTable;