const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'images') {
      cb(null, './uploads/images/');
    } else {
      cb(null, './uploads/videos/');
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'images') {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type'), false);
    }
  } else if (file.fieldname === 'videos') {
    if (file.mimetype === 'video/mp4' || file.mimetype === 'video/ogg') {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type'), false);
    }
  }
};

module.exports = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 15,
  },
  fileFilter: fileFilter,
});