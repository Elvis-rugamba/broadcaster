const incident = {
  data: {
    title: 'title',
    type: 'incident',
    comment: 'comment',
    location: '1.555, 15.568',
  },
  user: {
    userId: 1,
  },
  images: ['image1', 'image2'],
  videos: ['video1', 'video2'],
};

const missingFields = {};

const location = {
  location: '14.122, 12.464',
};

const invalidLocation = {
  location: '14.12212.464',
};

export default {
  incident,
  location,
  missingFields,
  invalidLocation,
};