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

  async getByid(id) {
    const incident = await db.query(query.findIncidentByid, [id]);
    return incident.rows[0];
  }

  async delete({ userId }, id) {
    const removed = await db.query(query.deleteIncidentByUseridAndId, [userId, id]);
    return removed.rows[0];
  }

  async updateLocation({ location }, { userId }, id) {
    const updated = await db.query(query.updateLocation, [location, userId, id]);
    return updated.rows[0];
  }

  async updateComment({ comment }, { userId }, id) {
    const updated = await db.query(query.updateComment, [comment, userId, id]);
    return updated.rows[0];
  }

  async updateStatus({ status }, id) {
    const updated = await db.query(query.updateStatus, [status, id]);
    return updated.rows[0];
  }
}

export default new Incident();
