const Joi = require('@hapi/joi');
const RedFlag = require('../models/red-flag');

function validateRedFlag(redFlag) {
  const schema = Joi.object({
    title: Joi.string()
      .min(3)
      .max(30)
      .required(),

    type: Joi.string()
      .required()
      .valid('red-flag', 'intervention'),

    comment: Joi.string()
      .min(3)
      .max(30)
      .required(),

    location: Joi.string()
      .required()
      .pattern(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/),
  });

  return schema.validate(redFlag);
}

function validateComment(comment) {
  const schema = Joi.object({
    comment: Joi.string()
      .min(3)
      .max(30)
      .required(),
  });

  return schema.validate(comment);
}

function validateLoction(location) {
  const schema = Joi.object({
    location: Joi.string()
      .required()
      .pattern(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/),
  });

  return schema.validate(location);
}

function validateStatus(status) {
  const schema = Joi.object({
    status: Joi.string()
      .required()
      .valid('draft', 'under investigation', 'rejected', 'resolved'),
  });

  return schema.validate(status);
}

exports.redFlags_get_all = async (req, res, next) => {
  const redFlags = RedFlag.all;
  if (req.userData.userType === 'user') {
    const userRedFlags = await RedFlag.filterByUserId(req.userData.userId);
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
};

exports.redFlags_create_redFlag = async (req, res, next) => {
  const redFlags = RedFlag.all;
  const redFlagImages = req.files.images;
  const redFlagVideos = req.files.videos;
  const images = [];
  const videos = [];

  const { error } = validateRedFlag(req.body);
  if (error) {
    return res.status(401).json({
      status: 401,
      error: error.details[0].message,
    });
  }

  if (redFlagImages !== undefined) redFlagImages.map((i) => images.push(i.path));
  if (redFlagVideos !== undefined) redFlagVideos.map((v) => videos.push(v.path));

  const max = await Math.max(...redFlags.map((redFlag) => redFlag.id));

  const redFlag = {
    id: max + 1,
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
  await RedFlag.create(redFlag);
  res.status(200).json({
    status: 200,
    data: [{
      id: redFlag.id,
      message: 'Created red-flag record',
    }],
  });
};

exports.redFlags_get_redFlag = async (req, res, next) => {
  const id = req.params.redFlagId;
  const redFlag = await RedFlag.findById(id);
  if (!redFlag) {
    return res.status(404).json({
      status: 404,
      error: 'The red-flag with the given ID not found',
    });
  }
  if (req.userData.userType === 'user') {
    if (redFlag.createdBy !== req.userData.userId) {
      return res.status(401).json({
        status: 401,
        error: 'Unauthorized',
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
};

exports.redFlags_update_redFlag = async (req, res, next) => {
  const id = req.params.redFlagId;
  const redFlagImages = req.files.images;
  const redFlagVideos = req.files.videos;
  let images = [];
  let videos = [];

  const redFlag = await RedFlag.findById(id);
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
    return res.status(401).json({
      status: 401,
      error: 'Unauthorized',
    });
  }

  const { error } = validateRedFlag(req.body);
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
};

exports.redFlags_update_redFlag_field = async (req, res, next) => {
  const { redFlagId: id, field } = req.params;

  const redFlag = await RedFlag.findById(id);
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
      return res.status(401).json({
        status: 401,
        error: 'Unauthorized',
      });
    }
    const { error } = validateLoction(req.body);
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
      return res.status(401).json({
        status: 401,
        error: 'Unauthorized',
      });
    }
    const { error } = validateComment(req.body);
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
    const { error } = validateStatus(req.body);
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
};

exports.redFlags_delete_redFlag = async (req, res, next) => {
  const id = req.params.redFlagId;
  const redFlag = await RedFlag.findById(id);
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
    return res.status(401).json({
      status: 401,
      error: 'Unauthorized',
    });
  }

  const removedRedFlag = await RedFlag.delete(redFlag);
  res.status(200).json({
    status: 200,
    data: [{
      id: removedRedFlag.id,
      message: 'Red-flag record has been deleted',

    }],
  });
};