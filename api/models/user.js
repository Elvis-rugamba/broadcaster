const users = [
  {
    id: 1,
    firstname: 'Elvis',
    lastname: 'Rugamba',
    email: 'elvisrugamba@gmail.com',
    phoneNumber: '0789279774',
    username: 'elvis-rugamba',
    password: '$2b$10$61MrELSTJ9YzrSFYltRa2uwvsRZlGVySxwfo/qduRIfZf6kvS2Tgi',
    type: 'admin',
    createdOn: '2019-11-05T12:00:00Z',
  },
  {
    id: 2,
    firstname: 'Test',
    lastname: 'Test',
    email: 'test@gmail.com',
    phoneNumber: '0789279770',
    username: 'test',
    password: '$2b$10$rZH9hWZe.aFgLJOpt99wI.aMaVkKrRBugjM17PvB6EDnsTo1OMPuS',
    type: 'user',
    createdOn: '2019-11-05T12:00:02Z',
  },
  {
    id: 3,
    firstname: 'Test1',
    lastname: 'Test1',
    email: 'test1@gmail.com',
    phoneNumber: '0789279772',
    username: 'test1',
    password: '$2b$10$rZH9hWZe.aFgLJOpt99wI.aMaVkKrRBugjM17PvB6EDnsTo1OMPuS',
    type: 'user',
    createdOn: '2019-11-05T12:00:02Z',
  },
];

class User {
  constructor() {
    this.users = users;
  }

  getAll() { return this.users; }

  create(user) {
    const max = Math.max(...this.users.map((u) => u.id));
    const id = max + 1;
    const newUser = { id, ...user };
    return this.users.push(newUser);
  }

  findById(id) { return this.users.find((user) => user.id === id); }

  findByEmail(val) { return this.users.find((user) => user.email === val); }

  findByUserName(val) { return this.users.find((user) => user.username === val); }

  findByPhoneNumber(val) { return this.users.find((user) => user.phoneNumber === val); }
}

export default new User();
