const RedFlag = require('../models/red-flag');

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

exports.redFlags_get_redFlag = async (req, res, next) => {
  const id = req.params.redFlagId;
  const redFlag = await RedFlag.findById(id);
  if (!redFlag) {
    return res.status(400).json({
      status: 400,
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
};