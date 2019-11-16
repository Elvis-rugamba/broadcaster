const redFlags = [
  {
    id: 1,
    title: 'title1',
    type: 'red-flag',
    comment: 'comment1',
    location: '14.548, 1.00548',
    images: [
      'uploads\\images\\1573507077837_Fishesharvested2.jpg',
      'uploads\\images\\1573507077843_Fishesharvested3.jpg',
    ],
    videos: [
      'uploads\\videos\\1573507077845_Collection_Medium.mp4',
    ],
    createdBy: 2,
    createdOn: '2019-11-05T12:00:02Z',
    status: 'draft',
  },
  {
    id: 2,
    title: 'title2',
    type: 'red-flag',
    comment: 'comment2',
    location: '14.566, 1.00502',
    images: [
      'uploads\\images\\1573507077837_Fishesharvested2.jpg',
    ],
    videos: [
      'uploads\\videos\\1573507077845_Collection_Medium.mp4',
    ],
    createdBy: 2,
    createdOn: '2019-11-05T12:00:03Z',
    status: 'under investigation',
  },
  {
    id: 3,
    title: 'title3',
    type: 'intervention',
    comment: 'comment3',
    location: '14.2438, 1.200548',
    images: [
      'uploads\\images\\1573507077843_Fishesharvested3.jpg',
    ],
    videos: [
      'uploads\\videos\\1573507077845_Collection_Medium.mp4',
    ],
    createdBy: 3,
    createdOn: '2019-11-05T12:00:05Z',
    status: 'draft',
  },
];

module.exports.all = redFlags;

module.exports.create = (redFlag) => redFlags.push(redFlag);

module.exports.findById = (id) => redFlags.find((redFlag) => redFlag.id === parseInt(id, 10));

module.exports.filterByUserId = (userId) => redFlags.filter((redFlag) => redFlag.createdBy === userId);

module.exports.delete = (redFlag) => {
  const index = redFlags.indexOf(redFlag);
  redFlags.splice(index, 1);
  return redFlag;
};