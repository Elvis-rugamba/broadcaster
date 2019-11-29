import dotenv from 'dotenv';
import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import server from '../server';

dotenv.config();

const { expect } = chai;
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
let redFlags = [
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
let token;

chai.use(chaiHttp);

describe('Create user account, Login a user and Check token', () => {
  beforeEach((done) => {
    // Reset user mode before each test
    // users.splice(0, users.length);
    done();
  });

  describe('POST /api/v1/auth/signup', () => {
    it('it should create a user account and return auth token', (done) => {
      const userRegister = {
        firstname: 'Elvis',
        lastname: 'Rugamba',
        email: 'rugamba@gmail.com',
        phoneNumber: '0789279777',
        username: 'rugamba',
        password: 'Rug123',
        password2: 'Rug123',
        type: 'admin',
      };

      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(userRegister)
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('data');
          expect(res.body.status).to.be.eql(200);
          expect(res.body.data).to.be.an('object');
          expect(res.body.data).to.have.property('token');
          done();
        })
        .catch((err) => done(err));
    });

    it('it should not create a user account with missing required fields', (done) => {
      const userRegister = {
        firstname: 'Elvis',
        lastname: 'Rugamba',
      };

      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(userRegister)
        .then((res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.eql(401);
          done();
        })
        .catch((err) => done(err));
    });

    it('it should not create a user account with invalid email', (done) => {
      const userRegister = {
        firstname: 'Elvis',
        lastname: 'Rugamba',
        email: 'rugamba1gmail.com',
        phoneNumber: '0789279779',
        username: 'rugamba1',
        password: 'Rug123',
        password2: 'Rug123',
        type: 'admin',
      };

      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(userRegister)
        .then((res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.eql(401);
          done();
        })
        .catch((err) => done(err));
    });

    it('it should not create a user account with an existing email', (done) => {
      const userRegister = {
        firstname: 'Elvis',
        lastname: 'Rugamba',
        email: users[0].email,
        phoneNumber: '0789279775',
        username: 'rugamba2',
        password: 'Rug123',
        password2: 'Rug123',
        type: 'admin',
      };

      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(userRegister)
        .then((res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.eql(401);
          done();
        })
        .catch((err) => done(err));
    });

    it('it should not create a user account with an existing username', (done) => {
      const userRegister = {
        firstname: 'Elvis',
        lastname: 'Rugamba',
        email: 'rugamba3@gmail.com',
        phoneNumber: '0789279778',
        username: users[0].username,
        password: 'Rug123',
        password2: 'Rug123',
        type: 'admin',
      };

      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(userRegister)
        .then((res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.eql(401);
          done();
        })
        .catch((err) => done(err));
    });

    it('it should not create a user account with an existing phone number', (done) => {
      const userRegister = {
        firstname: 'Elvis',
        lastname: 'Rugamba',
        email: 'rugamba@gmail.com',
        phoneNumber: users[0].phoneNumber,
        username: 'rugamba',
        password: 'Rug123',
        password2: 'Rug123',
        type: 'admin',
      };

      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(userRegister)
        .then((res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.eql(401);
          done();
        })
        .catch((err) => done(err));
    });

    it('it should not create a user account without confirming password', (done) => {
      const userRegister = {
        firstname: 'Elvis',
        lastname: 'Rugamba',
        email: 'rugamba@gmail.com',
        phoneNumber: users[0].phoneNumber,
        username: 'rugamba',
        password: 'Rug123',
        password2: 'Rug12',
        type: 'admin',
      };

      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(userRegister)
        .then((res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.eql(401);
          done();
        })
        .catch((err) => done(err));
    });
  });

  describe('POST /api/v1/auth/signin', () => {
    it('it should login a user and return auth token', (done) => {
      const userLogin = {
        email: 'elvisrugamba@gmail.com',
        password: 'elVis123',
      };

      chai.request(server)
        .post('/api/v1/auth/signin')
        .send(userLogin)
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.an('object');
          expect(res.body.data).to.have.property('token');
          done();
        })
        .catch((err) => done(err));
    });

    it('it should not login a user with missing required fields', (done) => {
      const userLogin = {
        email: '',
        password: 'elVis123',
      };

      chai.request(server)
        .post('/api/v1/auth/signin')
        .send(userLogin)
        .then((res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.eql(401);
          done();
        })
        .catch((err) => done(err));
    });

    it('it should not login a user with incorrect email', (done) => {
      const userLogin = {
        email: 'rug@gmail.com',
        password: 'elVis123',
      };

      chai.request(server)
        .post('/api/v1/auth/signin')
        .send(userLogin)
        .then((res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.eql(401);
          done();
        })
        .catch((err) => done(err));
    });

    it('it should not login a user with incorrect password', (done) => {
      const userLogin = {
        email: 'rugamba@gmail.com',
        password: 'elVis12',
      };

      chai.request(server)
        .post('/api/v1/auth/signin')
        .send(userLogin)
        .then((res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.eql(401);
          done();
        })
        .catch((err) => done(err));
    });
  });
});

describe('Users create red-flag record, edit and delete their red-flags', () => {
  beforeEach((done) => {
    const payload = {
      userId: users[1].id,
      email: users[1].email,
      username: users[1].username,
      firstname: users[1].firstname,
      lastname: users[1].lastname,
      userType: users[1].type,
    };
    token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: 3600 });
    done();
  });

  describe('GET /api/v1/red-flags', () => {
    it('it should fetch all ​red-flag ​records', (done) => {
      chai.request(server)
        .get('/api/v1/red-flags')
        .set('token', `Bearer ${token}`)
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('data');
          expect(res.body.status).to.be.eql(200);
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.be.an('object');
          done();
        })
        .catch((err) => done(err));
    });

    it('it should not fetch all ​red-flag ​records without being authenticated', (done) => {
      chai.request(server)
        .get('/api/v1/red-flags')
        .set('token', 'Bearer uknown/token')
        .then((res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.eql(401);
          done();
        })
        .catch((err) => done(err));
    });
  });

  describe('GET /api/v1/red-flags/<red-flag-id>', () => {
    it('it should fetch a specific ​red-flag​ record', (done) => {
      chai.request(server)
        .get(`/api/v1/red-flags/${redFlags[0].id}`)
        .set('token', `Bearer ${token}`)
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('data');
          expect(res.body.status).to.be.eql(200);
          expect(res.body.data).to.be.an('object');
          done();
        })
        .catch((err) => done(err));
    });

    it('it should not fetch the ​red-flag​ record without being authenticated', (done) => {
      chai.request(server)
        .get(`/api/v1/red-flags/${redFlags[0].id}`)
        .set('token', 'Bearer uknown/token')
        .then((res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.eql(401);
          done();
        })
        .catch((err) => done(err));
    });

    it('it should not fetch the ​red-flag​ record with invalid ID', (done) => {
      chai.request(server)
        .get('/api/v1/red-flags/id')
        .set('token', `Bearer ${token}`)
        .then((res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.eql(400);
          done();
        })
        .catch((err) => done(err));
    });

    it('it should not fetch the ​red-flag​ record with unkown ID', (done) => {
      chai.request(server)
        .get('/api/v1/red-flags/12')
        .set('token', `Bearer ${token}`)
        .then((res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.eql(404);
          done();
        })
        .catch((err) => done(err));
    });

    it('it should not fetch the other user\'s ​red-flag​ record', (done) => {
      chai.request(server)
        .get(`/api/v1/red-flags/${redFlags[2].id}`)
        .set('token', `Bearer ${token}`)
        .then((res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.eql(403);
          done();
        })
        .catch((err) => done(err));
    });
  });

  describe('POST /api/v1/red-flags', () => {
    it('it should create a red-flag​ record', (done) => {
      chai.request(server)
        .post('/api/v1/red-flags')
        .set('token', `Bearer ${token}`)
        .field('title', 'title test')
        .field('type', 'intervention')
        .field('comment', 'comment test')
        .field('location', '50.5556, -45.5644')
        .attach(
          'images', fs.readFileSync(`${__dirname}/sample files/Fishesharvested2.jpg`), 'Fishesharvested2.jpg',
        )
        .attach(
          'videos', fs.readFileSync(`${__dirname}/sample files/mov_bbb.mp4`), 'mov_bbb.mp4',
        )
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('data');
          expect(res.body.status).to.be.eql(200);
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.be.an('object');
          expect(res.body.data[0]).to.have.property('id');
          expect(res.body.data[0]).to.have.property('message');
          done();
        })
        .catch((err) => done(err));
    });

    it('it should not create a ​red-flag​ record without being authenticated', (done) => {
      chai.request(server)
        .get('/api/v1/red-flags')
        .set('token', 'Bearer uknown/token')
        .field('title', 'Updated title test')
        .field('type', 'intervention')
        .field('comment', 'comment test')
        .field('location', '50.5556, -45.5644')
        .attach(
          'images', fs.readFileSync(`${__dirname}/sample files/Fishesharvested2.jpg`), 'Fishesharvested2.jpg',
        )
        .attach(
          'videos', fs.readFileSync(`${__dirname}/sample files/mov_bbb.mp4`), 'mov_bbb.mp4',
        )
        .then((res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.eql(401);
          done();
        })
        .catch((err) => done(err));
    });

    it('it should not create a red-flag record with missing required fields', (done) => {
      chai.request(server)
        .post('/api/v1/red-flags')
        .set('token', `Bearer ${token}`)
        .field('title', 'Updated title test')
        .then((res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.eql(401);
          done();
        })
        .catch((err) => done(err));
    });

    it('it should not create a red-flag record with unsupported image or video file type', (done) => {
      chai.request(server)
        .post('/api/v1/red-flags')
        .set('token', `Bearer ${token}`)
        .field('title', 'Updated title test')
        .field('type', 'intervention')
        .field('comment', 'comment test')
        .field('location', '50.5556, -45.5644')
        .attach(
          'images', fs.readFileSync(`${__dirname}/sample files/giphy.gif`), 'giphy.gif',
        )
        .attach(
          'videos', fs.readFileSync(`${__dirname}/sample files/giphy.gif`), 'giphy.gif',
        )
        .then((res) => {
          expect(res).to.have.status(415);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.eql(415);
          done();
        })
        .catch((err) => done(err));
    });
  });

  describe('PATCH /api/v1/red-flags/<red-flag-id>', () => {
    it('it should update the ​red-flag​ record', (done) => {
      chai.request(server)
        .patch(`/api/v1/red-flags/${redFlags[0].id}`)
        .set('token', `Bearer ${token}`)
        .field('title', 'Updated title test')
        .field('type', 'intervention')
        .field('comment', 'Updated comment test')
        .field('location', '50.5556, -45.5644')
        .attach(
          'images', fs.readFileSync(`${__dirname}/sample files/Fishesharvested2.jpg`), 'Fishesharvested2.jpg',
        )
        .attach(
          'videos', fs.readFileSync(`${__dirname}/sample files/mov_bbb.mp4`), 'mov_bbb.mp4',
        )
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('data');
          expect(res.body.status).to.be.eql(200);
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.be.an('object');
          expect(res.body.data[0]).to.have.property('id');
          expect(res.body.data[0]).to.have.property('message');
          done();
        })
        .catch((err) => done(err));
    });

    it('it should not update the red-flag record without being authenticated', (done) => {
      chai.request(server)
        .patch(`/api/v1/red-flags/${redFlags[0].id}`)
        .set('token', 'Bearer uknown/token')
        .field('title', 'Updated title test')
        .field('type', 'intervention')
        .field('comment', 'Updated comment test')
        .field('location', '50.5556, -45.5644')
        .attach(
          'images', fs.readFileSync(`${__dirname}/sample files/Fishesharvested2.jpg`), 'Fishesharvested2.jpg',
        )
        .attach(
          'videos', fs.readFileSync(`${__dirname}/sample files/mov_bbb.mp4`), 'mov_bbb.mp4',
        )
        .then((res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.eql(401);
          done();
        })
        .catch((err) => done(err));
    });

    it('it should not update the ​red-flag​ record with invalid ID', (done) => {
      chai.request(server)
        .get('/api/v1/red-flags/id')
        .set('token', `Bearer ${token}`)
        .then((res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.eql(400);
          done();
        })
        .catch((err) => done(err));
    });

    it('it should not update the ​red-flag​ record with unkown ID', (done) => {
      chai.request(server)
        .patch('/api/v1/red-flags/12')
        .set('token', `Bearer ${token}`)
        .field('title', 'Updated title test')
        .field('type', 'intervention')
        .field('comment', 'Updated comment test')
        .field('location', '50.5556, -45.5644')
        .attach(
          'images', fs.readFileSync(`${__dirname}/sample files/Fishesharvested2.jpg`), 'Fishesharvested2.jpg',
        )
        .attach(
          'videos', fs.readFileSync(`${__dirname}/sample files/mov_bbb.mp4`), 'mov_bbb.mp4',
        )
        .then((res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.eql(404);
          done();
        })
        .catch((err) => done(err));
    });

    it('it should not update the red-flag record with missing required fields', (done) => {
      chai.request(server)
        .patch(`/api/v1/red-flags/${redFlags[0].id}`)
        .set('token', `Bearer ${token}`)
        .field('title', 'Updated title test')
        .then((res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.eql(401);
          done();
        })
        .catch((err) => done(err));
    });

    it('it should not update the other user\'s red-flag record', (done) => {
      chai.request(server)
        .patch(`/api/v1/red-flags/${redFlags[2].id}`)
        .set('token', `Bearer ${token}`)
        .field('title', 'Updated title test')
        .field('type', 'intervention')
        .field('comment', 'Updated comment test')
        .field('location', '50.5556, -45.5644')
        .attach(
          'images', fs.readFileSync(`${__dirname}/sample files/Fishesharvested2.jpg`), 'Fishesharvested2.jpg',
        )
        .attach(
          'videos', fs.readFileSync(`${__dirname}/sample files/mov_bbb.mp4`), 'mov_bbb.mp4',
        )
        .then((res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.eql(403);
          done();
        })
        .catch((err) => done(err));
    });

    it(`it should not update the red-flag record that is ${redFlags[1].status}`, (done) => {
      chai.request(server)
        .patch(`/api/v1/red-flags/${redFlags[1].id}`)
        .set('token', `Bearer ${token}`)
        .field('title', 'Updated title test')
        .field('type', 'intervention')
        .field('comment', 'Updated comment test')
        .field('location', '50.5556, -45.5644')
        .attach(
          'images', fs.readFileSync(`${__dirname}/sample files/Fishesharvested2.jpg`), 'Fishesharvested2.jpg',
        )
        .attach(
          'videos', fs.readFileSync(`${__dirname}/sample files/mov_bbb.mp4`), 'mov_bbb.mp4',
        )
        .then((res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.eql(401);
          done();
        })
        .catch((err) => done(err));
    });
  });

  describe('PATCH /api/v1/red-flags/<red-flag-id>/location', () => {
    it('it should update the ​red-flag​ record\'s location', (done) => {
      chai.request(server)
        .patch(`/api/v1/red-flags/${redFlags[0].id}/location`)
        .set('token', `Bearer ${token}`)
        .send({ location: '50.5556, -45.5644' })
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('data');
          expect(res.body.status).to.be.eql(200);
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.be.an('object');
          expect(res.body.data[0]).to.have.property('id');
          expect(res.body.data[0]).to.have.property('message');
          done();
        })
        .catch((err) => done(err));
    });

    it('it should not update the red-flag record\'s location without being authenticated', (done) => {
      chai.request(server)
        .patch(`/api/v1/red-flags/${redFlags[0].id}/location`)
        .set('token', 'Bearer uknown/token')
        .send({ location: '50.5556, -45.56s44' })
        .then((res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.eql(401);
          done();
        })
        .catch((err) => done(err));
    });

    it('it should not update the ​red-flag​ record\'s location with invalid ID', (done) => {
      chai.request(server)
        .get('/api/v1/red-flags/id')
        .set('token', `Bearer ${token}`)
        .then((res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.eql(400);
          done();
        })
        .catch((err) => done(err));
    });

    it('it should not update the ​red-flag​ record\'s location with unkown ID', (done) => {
      chai.request(server)
        .patch('/api/v1/red-flags/12/location')
        .set('token', `Bearer ${token}`)
        .send({ location: '50.5556, -45.56s44' })
        .then((res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.eql(404);
          done();
        })
        .catch((err) => done(err));
    });

    it('it should not update the red-flag record\'s location with missing required fields', (done) => {
      chai.request(server)
        .patch(`/api/v1/red-flags/${redFlags[0].id}/location`)
        .set('token', `Bearer ${token}`)
        .send({ location: '' })
        .then((res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.eql(401);
          done();
        })
        .catch((err) => done(err));
    });

    it('it should not update the other user\'s red-flag record\'s location', (done) => {
      chai.request(server)
        .patch(`/api/v1/red-flags/${redFlags[2].id}/location`)
        .set('token', `Bearer ${token}`)
        .send({ location: '50.5556, -45.56s44' })
        .then((res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.eql(403);
          done();
        })
        .catch((err) => done(err));
    });
  });

  describe('PATCH /api/v1/red-flags/<red-flag-id>/comment', () => {
    it('it should update the ​red-flag​ record\'s comment', (done) => {
      chai.request(server)
        .patch(`/api/v1/red-flags/${redFlags[0].id}/comment`)
        .set('token', `Bearer ${token}`)
        .send({ comment: 'Updated comment' })
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('data');
          expect(res.body.status).to.be.eql(200);
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.be.an('object');
          expect(res.body.data[0]).to.have.property('id');
          expect(res.body.data[0]).to.have.property('message');
          done();
        })
        .catch((err) => done(err));
    });

    it('it should not update the red-flag record\'s comment without being authenticated', (done) => {
      chai.request(server)
        .patch(`/api/v1/red-flags/${redFlags[0].id}/comment`)
        .set('token', 'Bearer uknown/token')
        .send({ comment: 'Updated comment' })
        .then((res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.eql(401);
          done();
        })
        .catch((err) => done(err));
    });

    it('it should not update the ​red-flag​ record\'s comment with invalid ID', (done) => {
      chai.request(server)
        .get('/api/v1/red-flags/id')
        .set('token', `Bearer ${token}`)
        .then((res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.eql(400);
          done();
        })
        .catch((err) => done(err));
    });

    it('it should not update the ​red-flag​ record\'s comment with unkown ID', (done) => {
      chai.request(server)
        .patch('/api/v1/red-flags/12/location')
        .set('token', `Bearer ${token}`)
        .send({ comment: 'Updated comment' })
        .then((res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.eql(404);
          done();
        })
        .catch((err) => done(err));
    });

    it('it should not update the red-flag record\'s comment with missing required fields', (done) => {
      chai.request(server)
        .patch(`/api/v1/red-flags/${redFlags[0].id}/comment`)
        .set('token', `Bearer ${token}`)
        .send({ comment: '' })
        .then((res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.eql(401);
          done();
        })
        .catch((err) => done(err));
    });

    it('it should not update the other user\'s red-flag record\'s comment', (done) => {
      chai.request(server)
        .patch(`/api/v1/red-flags/${redFlags[2].id}/comment`)
        .set('token', `Bearer ${token}`)
        .send({ comment: 'Updated comment' })
        .then((res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.eql(403);
          done();
        })
        .catch((err) => done(err));
    });

    it('it should not update the red-flag record\'s invalid field', (done) => {
      chai.request(server)
        .patch(`/api/v1/red-flags/${redFlags[2].id}/invalid`)
        .set('token', `Bearer ${token}`)
        .send({ invalid: 'Updated comment' })
        .then((res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.eql(401);
          done();
        })
        .catch((err) => done(err));
    });
  });

  describe('Delete /api/v1/red-flags/<red-flag-id>', () => {
    beforeEach((done) => {
      redFlags = [
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
      done();
    });
    it('it should delete the ​red-flag​ record', (done) => {
      chai.request(server)
        .delete(`/api/v1/red-flags/${redFlags[0].id}`)
        .set('token', `Bearer ${token}`)
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('data');
          expect(res.body.status).to.be.eql(200);
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.be.an('object');
          expect(res.body.data[0]).to.have.property('id');
          expect(res.body.data[0]).to.have.property('message');
          done();
        })
        .catch((err) => done(err));
    });

    it('it should not delete the red-flag record without being authenticated', (done) => {
      chai.request(server)
        .patch(`/api/v1/red-flags/${redFlags[0].id}`)
        .set('token', 'Bearer uknown/token')
        .then((res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.eql(401);
          done();
        })
        .catch((err) => done(err));
    });

    it('it should not delete the ​red-flag​ record with invalid ID', (done) => {
      chai.request(server)
        .delete('/api/v1/red-flags/id')
        .set('token', `Bearer ${token}`)
        .then((res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.eql(400);
          done();
        })
        .catch((err) => done(err));
    });

    it('it should not delete the ​red-flag​ record with unkown ID', (done) => {
      chai.request(server)
        .delete('/api/v1/red-flags/12')
        .set('token', `Bearer ${token}`)
        .then((res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.eql(404);
          done();
        })
        .catch((err) => done(err));
    });

    it('it should not delete the other user\'s ​red-flag​ record', (done) => {
      chai.request(server)
        .delete(`/api/v1/red-flags/${redFlags[2].id}`)
        .set('token', `Bearer ${token}`)
        .then((res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.eql(403);
          done();
        })
        .catch((err) => done(err));
    });

    it(`it should not delete red-flag record that is ${redFlags[1].status}`, (done) => {
      chai.request(server)
        .delete(`/api/v1/red-flags/${redFlags[1].id}`)
        .set('token', `Bearer ${token}`)
        .then((res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.eql(401);
          done();
        })
        .catch((err) => done(err));
    });
  });
});

describe('Admin change red-flag record\'s status and list all the red-flags created by all users', () => {
  beforeEach((done) => {
    const payload = {
      userId: users[0].id,
      email: users[0].email,
      username: users[0].username,
      firstname: users[0].firstname,
      lastname: users[0].lastname,
      userType: users[0].type,
    };
    token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: 3600 });
    done();
  });

  describe('GET /api/v1/red-flags', () => {
    it('it should fetch all ​red-flag ​records', (done) => {
      chai.request(server)
        .get('/api/v1/red-flags')
        .set('token', `Bearer ${token}`)
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('data');
          expect(res.body.status).to.be.eql(200);
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.be.an('object');
          done();
        })
        .catch((err) => done(err));
    });

    it('it should not fetch all ​red-flag ​records without being authenticated', (done) => {
      chai.request(server)
        .get('/api/v1/red-flags')
        .set('token', 'Bearer uknown/token')
        .then((res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.eql(401);
          done();
        })
        .catch((err) => done(err));
    });
  });

  describe('GET /api/v1/red-flags/<red-flag-id>', () => {
    it('it should fetch a specific ​red-flag​ record', (done) => {
      chai.request(server)
        .get('/api/v1/red-flags/2')
        .set('token', `Bearer ${token}`)
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('data');
          expect(res.body.status).to.be.eql(200);
          expect(res.body.data).to.be.an('object');
          done();
        })
        .catch((err) => done(err));
    });

    it('it should not fetch a specific ​red-flag​ record without being authenticated', (done) => {
      chai.request(server)
        .get('/api/v1/red-flags/1')
        .set('token', 'Bearer uknown/token')
        .then((res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.eql(401);
          done();
        })
        .catch((err) => done(err));
    });
  });

  it('it should not fetch a specific ​red-flag with invalid ID', (done) => {
    chai.request(server)
      .get('/api/v1/red-flags/id')
      .set('token', `Bearer ${token}`)
      .then((res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body.status).to.be.eql(400);
        done();
      })
      .catch((err) => done(err));
  });

  describe('PATCH /api/v1/red-flags/<red-flag-id>/status', () => {
    it('it should update the ​red-flag​ record\'s status', (done) => {
      chai.request(server)
        .patch('/api/v1/red-flags/2/status')
        .set('token', `Bearer ${token}`)
        .send({ status: 'under investigation' })
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('data');
          expect(res.body.status).to.be.eql(200);
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.be.an('object');
          expect(res.body.data[0]).to.have.property('id');
          expect(res.body.data[0]).to.have.property('message');
          done();
        })
        .catch((err) => done(err));
    });

    it('it should not update the ​red-flag​ record\'s status without being authenticated', (done) => {
      chai.request(server)
        .patch('/api/v1/red-flags/1/status')
        .set('token', 'Bearer uknown/token')
        .then((res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.eql(401);
          done();
        })
        .catch((err) => done(err));
    });

    it('it should not update the ​red-flag​ record\'s status with invalid ID', (done) => {
      chai.request(server)
        .get('/api/v1/red-flags/id')
        .set('token', `Bearer ${token}`)
        .then((res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.eql(400);
          done();
        })
        .catch((err) => done(err));
    });
  });
});

describe('Not found', () => {
  beforeEach((done) => {
    const payload = {
      userId: users[1].id,
      email: users[1].email,
      username: users[1].username,
      firstname: users[1].firstname,
      lastname: users[1].lastname,
      userType: users[1].type,
    };
    token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: 3600 });
    done();
  });

  describe('GET /api/v1/unknown', () => {
    it('it should return 404 for invalid API endpoints', (done) => {
      chai.request(server)
        .get('/api/v1/uknown')
        .set('token', `Bearer ${token}`)
        .then((res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.eql(404);
          done();
        })
        .catch((err) => done(err));
    });
  });
});