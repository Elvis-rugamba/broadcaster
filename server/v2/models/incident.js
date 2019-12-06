import db from '../db/config';
import query from '../db/queries';

class Incident {
  async create({
    title, type, comment, location,
  }, { userId }, images, videos) {
    try {
      const createdIncident = await db.query(query.createIncidents,
        [title, type, comment, location, images, videos, userId, 'draft']);
      return createdIncident.rows[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getAll({ userType, userId }) {
    try {
      if (userType === 'admin') {
        const incidents = await db.query(query.findIncidents);
        return incidents.rows;
      }
      const incidents = await db.query(query.findIncidentByUserid, [userId]);
      return incidents.rows;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new Incident();
