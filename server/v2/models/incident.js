import db from '../db/config';
import query from '../db/queries';

class Incident {
  constructor() {
    db.query(query.createIncidentsTable);
    db.query(query.createTestUsersTable);
  }

  async create({
    title, type, comment, location,
  }, { userId }, images, videos) {
    try {
      const createdIncident = await db.query(query.createIncidents,
        [title, type, comment, location, images, videos, userId, 'draft']);
      return createdIncident.rows[0];
    } catch (error) {
      console.log(error);
    }
  }
}

export default new Incident();
