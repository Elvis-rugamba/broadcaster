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