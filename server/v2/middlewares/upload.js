import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'images') {
      cb(null, 'server/v1/uploads/images/');
    } else {
      cb(null, 'server/v1/uploads/videos/');
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
      const error = new Error('Unsupported image file type');
      error.status = 415;
      cb(error, false);
    }
  } else if (file.fieldname === 'videos') {
    if (file.mimetype === 'video/mp4' || file.mimetype === 'video/ogg') {
      cb(null, true);
    } else {
      const error = new Error('Unsupported video file type');
      error.status = 415;
      cb(error, false);
    }
  } else {
    const error = new Error('Invalid field name');
    error.status = 401;
    cb(error, false);
  }
};

export default multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 15,
  },
  fileFilter: fileFilter,
});