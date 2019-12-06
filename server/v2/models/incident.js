import db from '../db/config';
import query from '../db/queries';

class Incident {
  async create({
    title, type, comment, location,
  }, { userId }, images, videos) {
    const createdIncident = await db.query(query.createIncidents,
      [title, type, comment, location, images, videos, userId, 'draft']);
    return createdIncident.rows[0];
  }

  async getAll({ userType, userId }) {
    if (userType === 'admin') {
      const incidents = await db.query(query.findIncidents);
      return incidents.rows;
    }
    const incidents = await db.query(query.findIncidentByUserid, [userId]);
    return incidents.rows;
  }

  async getOne({ userType, userId }, id) {
    if (userType === 'admin') {
      const incident = await db.query(query.findIncidentByid, [id]);
      return incident.rows[0];
    }

    const incident = await db.query(query.findIncidentByUseridAndId, [userId, id]);
    return incident.rows[0];
  }
}

export default new Incident();
