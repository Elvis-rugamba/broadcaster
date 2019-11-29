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

class RedFlag {
  constructor() {
    this.redFlags = redFlags;
  }

  getAll() { return this.redFlags; }

  create(redFlag) {
    const max = Math.max(...this.redFlags.map((r) => r.id));
    const id = max + 1;
    const newRedFlag = { id, ...redFlag };
    return this.redFlags.push(newRedFlag);
  }

  findById(id) { return this.redFlags.find((redFlag) => redFlag.id === id); }

  filterByUserId(userId) { return this.redFlags.filter((redFlag) => redFlag.createdBy === userId); }

  delete(redFlag) {
    const index = this.redFlags.indexOf(redFlag);
    this.redFlags.splice(index, 1);
    return redFlag;
  }
}

export default new RedFlag();