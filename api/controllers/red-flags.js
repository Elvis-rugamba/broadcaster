import RedFlag from '../models/red-flag';
import RedFlagValidation from '../helpers/redFlagValidation';

class RedFlagsController {
  static redFlagsGetAll(req, res) {
    const redFlags = RedFlag.getAll();
    if (req.userData.userType === 'user') {
      const userRedFlags = RedFlag.filterByUserId(req.userData.userId);
      return res.status(200).json({
        status: 200,
        data: userRedFlags,
      });
    }
    if (req.userData.userType === 'admin') {
      return res.status(200).json({
        status: 200,
        data: redFlags,
      });
    }
  }

  static redFlagsGetRedFlag(req, res) {
    const id = parseInt(req.params.redFlagId, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({
        status: 400,
        error: 'The red-flag ID must be a valid integer',
      });
    }
    const redFlag = RedFlag.findById(id);
    if (!redFlag) {
      return res.status(404).json({
        status: 404,
        error: 'The red-flag with the given ID not found',
      });
    }
    if (req.userData.userType === 'user') {
      if (redFlag.createdBy !== req.userData.userId) {
        return res.status(403).json({
          status: 403,
          error: 'Access denied',
        });
      }
      return res.status(200).json({
        status: 200,
        data: redFlag,
      });
    }
    if (req.userData.userType === 'admin') {
      return res.status(200).json({
        status: 200,
        data: redFlag,
      });
    }
  }

  static redFlagsCreateRedFlag(req, res) {
    const redFlagImages = req.files.images;
    const redFlagVideos = req.files.videos;
    const images = [];
    const videos = [];

    const { error } = RedFlagValidation.validateRedFlag(req.body);
    if (error) {
      return res.status(401).json({
        status: 401,
        error: error.details[0].message,
      });
    }

    if (redFlagImages !== undefined) redFlagImages.map((i) => images.push(i.path));
    if (redFlagVideos !== undefined) redFlagVideos.map((v) => videos.push(v.path));

    const redFlag = {
      title: req.body.title,
      type: req.body.type,
      comment: req.body.comment,
      location: req.body.location,
      images: images,
      videos: videos,
      createdBy: req.userData.userId,
      createdOn: new Date().toISOString(),
      status: 'draft',
    };
    const id = RedFlag.create(redFlag);
    res.status(200).json({
      status: 200,
      data: [{
        id: id,
        message: 'Created red-flag record',
      }],
    });
  }

  static redFlagsUpdateRedFlag(req, res) {
    const id = parseInt(req.params.redFlagId, 10);
    const redFlagImages = req.files.images;
    const redFlagVideos = req.files.videos;
    let images = [];
    let videos = [];

    if (Number.isNaN(id)) {
      return res.status(400).json({
        status: 400,
        error: 'The red-flag ID must be a valid integer',
      });
    }

    const redFlag = RedFlag.findById(id);
    if (!redFlag) {
      return res.status(404).json({
        status: 404,
        error: 'The red-flag with the given ID not found',
      });
    }

    if (redFlag.status !== 'draft') {
      return res.status(401).json({
        status: 401,
        error: `Can not edit red-flag record because it is ${redFlag.status}`,
      });
    }

    if (redFlag.createdBy !== req.userData.userId) {
      return res.status(403).json({
        status: 403,
        error: 'Access denied',
      });
    }

    const { error } = RedFlagValidation.validateRedFlag(req.body);
    if (error) {
      return res.status(401).json({
        status: 401,
        error: error.details[0].message,
      });
    }

    if (redFlagImages === undefined) {
      images = redFlag.images;
    } else {
      redFlagImages.map((i) => images.push(i.path));
    }

    if (redFlagVideos === undefined) {
      videos = redFlag.videos;
    } else {
      redFlagVideos.map((v) => videos.push(v.path));
    }

    redFlag.title = req.body.title;
    redFlag.type = req.body.type;
    redFlag.comment = req.body.comment;
    redFlag.location = req.body.location;
    redFlag.images = images;
    redFlag.videos = videos;

    res.status(200).json({
      status: 200,
      data: [{
        id: redFlag.id,
        message: 'Updated red-flag record',
      }],
    });
  }

  static redFlagsUpdateRedFlagField(req, res) {
    const { redFlagId, field } = req.params;
    const id = parseInt(redFlagId, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({
        status: 400,
        error: 'The red-flag ID must be a valid integer',
      });
    }

    const redFlag = RedFlag.findById(id);
    if (!redFlag) {
      return res.status(404).json({
        status: 404,
        error: 'The red-flag with the given ID not found',
      });
    }

    if (field === 'location') {
      if (redFlag.status !== 'draft') {
        return res.status(401).json({
          status: 401,
          error: `Can not edit red-flag record because it is ${redFlag.status}`,
        });
      }
      if (redFlag.createdBy !== req.userData.userId) {
        return res.status(403).json({
          status: 403,
          error: 'Access denied',
        });
      }
      const { error } = RedFlagValidation.validateLoction(req.body);
      if (error) {
        return res.status(401).json({
          status: 401,
          error: error.details[0].message,
        });
      }

      redFlag.location = req.body.location;
      res.status(200).json({
        status: 200,
        data: [{
          id: redFlag.id,
          message: 'Updated red-flag record\'s locaton',
        }],
      });
    } else if (field === 'comment') {
      if (redFlag.status !== 'draft') {
        return res.status(401).json({
          status: 401,
          error: `Can not edit red-flag record because it is ${redFlag.status}`,
        });
      }
      if (redFlag.createdBy !== req.userData.userId) {
        return res.status(403).json({
          status: 403,
          error: 'Access denied',
        });
      }
      const { error } = RedFlagValidation.validateComment(req.body);
      if (error) {
        return res.status(401).json({
          status: 401,
          error: error.details[0].message,
        });
      }

      redFlag.comment = req.body.comment;
      res.status(200).json({
        status: 200,
        data: [{
          id: redFlag.id,
          message: 'Updated red-flag record\'s comment',
        }],
      });
    } else if (field === 'status') {
      if (req.userData.userType !== 'admin') {
        return res.status(401).json({
          status: 401,
          error: 'Unauthorized',
        });
      }
      const { error } = RedFlagValidation.validateStatus(req.body);
      if (error) {
        return res.status(401).json({
          status: 401,
          error: error.details[0].message,
        });
      }

      redFlag.status = req.body.status;
      res.status(200).json({
        status: 200,
        data: [{
          id: redFlag.id,
          message: 'Updated red-flag record\'s status',
        }],
      });
    } else {
      res.status(401).json({
        status: 401,
        error: 'The given field is not valid',
      });
    }
  }

  static redFlagsDeleteRedFlag(req, res) {
    const id = parseInt(req.params.redFlagId, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({
        status: 400,
        error: 'The red-flag ID must be a valid integer',
      });
    }
    const redFlag = RedFlag.findById(id);
    if (!redFlag) {
      return res.status(404).json({
        status: 404,
        error: 'The red-flag with the given ID not found',
      });
    }

    if (redFlag.status !== 'draft') {
      return res.status(401).json({
        status: 401,
        error: `Can not edit red-flag record because it is ${redFlag.status}`,
      });
    }

    if (redFlag.createdBy !== req.userData.userId) {
      return res.status(403).json({
        status: 403,
        error: 'Access denied',
      });
    }

    const removedRedFlag = RedFlag.delete(redFlag);
    res.status(200).json({
      status: 200,
      data: [{
        id: removedRedFlag.id,
        message: 'Red-flag record has been deleted',

      }],
    });
  }
}

export default RedFlagsController;