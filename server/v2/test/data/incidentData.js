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

const comment = {
  comment: 'Updated comment',
};

const invalidComment = {
  comment: 'co',
};

const status = {
  status: 'under investigation',
};

const invalidStatus = {
  status: 'invalid',
};

export default {
  incident,
  location,
  missingFields,
  invalidLocation,
  comment,
  invalidComment,
  status,
  invalidStatus,
};