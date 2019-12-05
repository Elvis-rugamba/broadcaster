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
      console.log(error);
      res.status(500).json({
        status: 500,
        error: 'Internal Server Error!',
      });
    }
  }
}

export default UserController;
