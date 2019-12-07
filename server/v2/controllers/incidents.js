import Incident from '../models/incident';

class UserController {
  static async createIncident(req, res) {
    const redFlagImages = req.files.images;
    const redFlagVideos = req.files.videos;
    const images = [];
    const videos = [];

    if (redFlagImages !== undefined) redFlagImages.map((i) => images.push(i.path));
    if (redFlagVideos !== undefined) redFlagVideos.map((v) => videos.push(v.path));

    try {
      const createdIncident = await Incident.create(req.body, req.userData, images, videos);
      res.status(201).json({
        status: 201,
        data: [{
          id: createdIncident.id,
          message: 'Created red-flag record',
        }],
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: 'Internal Server Error!',
      });
    }
  }

  static async getAllIncidents(req, res) {
    try {
      const incidents = await Incident.getAll(req.userData);
      if (incidents.length < 0) {
        return res.status(500).json({
          status: 404,
          error: 'No data available',
        });
      }
      return res.status(200).json({
        status: 200,
        data: incidents,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: 'Internal Server Error!',
      });
    }
  }

  static async getSpecificInident(req, res) {
    const id = parseInt(req.params.redFlagId, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({
        status: 400,
        error: 'The red-flag ID must be a valid integer',
      });
    }

    try {
      const incident = await Incident.getByid(id);
      if (!incident) {
        return res.status(404).json({
          status: 404,
          error: 'The red-flag with the given ID not found',
        });
      }

      if (req.userData.userType === 'user') {
        if (incident.createdby !== req.userData.userId) {
          return res.status(403).json({
            status: 403,
            error: 'Access to the resources denied',
          });
        }
      }

      const getIncident = await Incident.getOne(req.userData, id);

      return res.status(200).json({
        status: 200,
        data: getIncident,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Internal Server Error!',
      });
    }
  }

  static async deleteInident(req, res) {
    const id = parseInt(req.params.redFlagId, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({
        status: 400,
        error: 'The red-flag ID must be a valid integer',
      });
    }

    try {
      const incident = await Incident.getByid(id);

      if (!incident) {
        return res.status(404).json({
          status: 404,
          error: 'The red-flag with the given ID not found',
        });
      }

      if (incident.createdby !== req.userData.userId) {
        return res.status(403).json({
          status: 403,
          error: 'Access to the resources denied',
        });
      }

      await Incident.delete(req.userData, id);
      return res.status(200).json({
        status: 200,
        data: [{
          id: id,
          message: 'Red-flag record has been deleted',

        }],
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Internal Server Error!',
      });
    }
  }

  static async updateLocation(req, res) {
    const { redFlagId } = req.params;
    const id = parseInt(redFlagId, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({
        status: 400,
        error: 'The red-flag ID must be a valid integer',
      });
    }

    try {
      const incident = await Incident.getByid(id);

      if (!incident) {
        return res.status(404).json({
          status: 404,
          error: 'The red-flag with the given ID not found',
        });
      }

      if (incident.createdby !== req.userData.userId) {
        return res.status(403).json({
          status: 403,
          error: 'Access to the resources denied',
        });
      }

      await Incident.updateLocation(req.body, req.userData, id);
      return res.status(200).json({
        status: 200,
        data: [{
          id: id,
          message: '​Updated red-flag record’s location',

        }],
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Internal Server Error!',
      });
    }
  }
}

export default UserController;
