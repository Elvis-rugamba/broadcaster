import db from '../db/config';
import query from '../db/queries';

class Incident {
  constructor() {
    db.query(query.createIncidentsTable);
    db.query(query.createTestUsersTable);
  }

  async create(req, images, videos) {
    try {
      const createdIncident = await db.query(query.createIncidents,
        [req.body.title, req.body.type, req.body.comment, req.body.location, images, videos, req.userData.userId, 'draft']);
      return createdIncident.rows[0];
    } catch (error) {
      console.log(error);
    }
  }
}

export default new Incident();
