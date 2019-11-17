require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const server = require('../server');
const User = require('../api/models/user');
const RedFlag = require('../api/models/red-flag');

const should = chai.should();
const { expect } = chai;
const users = User.all;
let redFlags = RedFlag.all;
let token;

chai.use(chaiHttp);

describe('Create user account, Login a user and Check token', () => {
  beforeEach((done) => {
    // Reset user mode before each test
    // users.splice(0, users.length);
    done();
  });

  describe('GET /api/v1/auth', () => {
    it('it should GET all users', (done) => {
      chai.request(server)
        .get('/api/v1/auth')
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('data');
          expect(res.body.status).to.be.eql(200);
          expect(res.body.data).to.be.an('array');
          done();
        })
        .catch((err) => done(err));
    });
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
          // expect(res.headers.Authorization).not.toBeNull();
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
          // expect(res.headers.Authorization).not.toBeNull();
          done();
        })
        .catch((err) => done(err));
    });

    it('it should not login a user with incorrect email or password', (done) => {
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
          // expect(res.headers.Authorization).not.toBeNull();
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
        .set('Authorization', `Bearer ${token}`)
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
        .set('Authorization', 'Bearer uknown/token')
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
        .set('Authorization', `Bearer ${token}`)
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
        .set('Authorization', 'Bearer uknown/token')
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

    it('it should not fetch the ​red-flag​ record with unkown ID', (done) => {
      chai.request(server)
        .get('/api/v1/red-flags/12')
        .set('Authorization', `Bearer ${token}`)
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
        .set('Authorization', `Bearer ${token}`)
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

  describe('POST /api/v1/red-flags', () => {
    it('it should create a ​red-flag​ record', (done) => {
      chai.request(server)
        .post('/api/v1/red-flags')
        .set('Authorization', `Bearer ${token}`)
        .field('title', 'title test')
        .field('type', 'intervention')
        .field('comment', 'comment test')
        .field('location', '50.5556, -45.5644')
        .attach(
          'images', fs.readFileSync('uploads/sample/Fishesharvested2.jpg'), 'Fishesharvested2.jpg',
        )
        .attach(
          'videos', fs.readFileSync('uploads/sample/mov_bbb.mp4'), 'mov_bbb.mp4',
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
        .set('Authorization', 'Bearer uknown/token')
        .field('title', 'Updated title test')
        .field('type', 'intervention')
        .field('comment', 'comment test')
        .field('location', '50.5556, -45.5644')
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
        .set('Authorization', `Bearer ${token}`)
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
  });

  describe('PATCH /api/v1/red-flags/<red-flag-id>', () => {
    it('it should update the ​red-flag​ record', (done) => {
      chai.request(server)
        .patch(`/api/v1/red-flags/${redFlags[0].id}`)
        .set('Authorization', `Bearer ${token}`)
        .field('title', 'Updated title test')
        .field('type', 'intervention')
        .field('comment', 'Updated comment test')
        .field('location', '50.5556, -45.5644')
        .attach(
          'images', fs.readFileSync('uploads/sample/Fishesharvested2.jpg'), 'Fishesharvested2.jpg',
        )
        .attach(
          'videos', fs.readFileSync('uploads/sample/mov_bbb.mp4'), 'mov_bbb.mp4',
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
        .set('Authorization', 'Bearer uknown/token')
        .field('title', 'Updated title test')
        .field('type', 'intervention')
        .field('comment', 'Updated comment test')
        .field('location', '50.5556, -45.5644')
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

    it('it should not update the ​red-flag​ record with unkown ID', (done) => {
      chai.request(server)
        .patch('/api/v1/red-flags/12')
        .set('Authorization', `Bearer ${token}`)
        .field('title', 'Updated title test')
        .field('type', 'intervention')
        .field('comment', 'Updated comment test')
        .field('location', '50.5556, -45.5644')
        .attach(
          'images', fs.readFileSync('uploads/sample/Fishesharvested2.jpg'), 'Fishesharvested2.jpg',
        )
        .attach(
          'videos', fs.readFileSync('uploads/sample/mov_bbb.mp4'), 'mov_bbb.mp4',
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
        .patch(`/api/v1/red-flags/${redFlags[2].id}`)
        .set('Authorization', `Bearer ${token}`)
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
        .set('Authorization', `Bearer ${token}`)
        .field('title', 'Updated title test')
        .field('type', 'intervention')
        .field('comment', 'Updated comment test')
        .field('location', '50.5556, -45.5644')
        .attach(
          'images', fs.readFileSync('uploads/sample/Fishesharvested2.jpg'), 'Fishesharvested2.jpg',
        )
        .attach(
          'videos', fs.readFileSync('uploads/sample/mov_bbb.mp4'), 'mov_bbb.mp4',
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

    it(`it should not update the red-flag record that is ${redFlags[1].status}`, (done) => {
      chai.request(server)
        .patch(`/api/v1/red-flags/${redFlags[1].id}`)
        .set('Authorization', `Bearer ${token}`)
        .field('title', 'Updated title test')
        .field('type', 'intervention')
        .field('comment', 'Updated comment test')
        .field('location', '50.5556, -45.5644')
        .attach(
          'images', fs.readFileSync('uploads/sample/Fishesharvested2.jpg'), 'Fishesharvested2.jpg',
        )
        .attach(
          'videos', fs.readFileSync('uploads/sample/mov_bbb.mp4'), 'mov_bbb.mp4',
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
        .set('Authorization', `Bearer ${token}`)
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
        .set('Authorization', 'Bearer uknown/token')
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

    it('it should not update the ​red-flag​ record\'s location with unkown ID', (done) => {
      chai.request(server)
        .patch('/api/v1/red-flags/12/location')
        .set('Authorization', `Bearer ${token}`)
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
        .set('Authorization', `Bearer ${token}`)
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
        .set('Authorization', `Bearer ${token}`)
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
  });

  describe('PATCH /api/v1/red-flags/<red-flag-id>/comment', () => {
    it('it should update the ​red-flag​ record\'s comment', (done) => {
      chai.request(server)
        .patch(`/api/v1/red-flags/${redFlags[0].id}/comment`)
        .set('Authorization', `Bearer ${token}`)
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
        .set('Authorization', 'Bearer uknown/token')
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

    it('it should not update the ​red-flag​ record\'s comment with unkown ID', (done) => {
      chai.request(server)
        .patch('/api/v1/red-flags/12/location')
        .set('Authorization', `Bearer ${token}`)
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
        .set('Authorization', `Bearer ${token}`)
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
        .set('Authorization', `Bearer ${token}`)
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
  });

  describe('Delete /api/v1/red-flags/<red-flag-id>', () => {
    beforeEach((done) => {
      redFlags = RedFlag.all;
      done();
    });
    it('it should delete the ​red-flag​ record', (done) => {
      chai.request(server)
        .delete(`/api/v1/red-flags/${redFlags[0].id}`)
        .set('Authorization', `Bearer ${token}`)
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
        .set('Authorization', 'Bearer uknown/token')
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

    it('it should not delete the ​red-flag​ record with unkown ID', (done) => {
      chai.request(server)
        .delete('/api/v1/red-flags/12')
        .set('Authorization', `Bearer ${token}`)
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
        .delete(`/api/v1/red-flags/${redFlags[1].id}`)
        .set('Authorization', `Bearer ${token}`)
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

    it(`it should not delete red-flag record that is ${redFlags[1].status}`, (done) => {
      chai.request(server)
        .delete(`/api/v1/red-flags/${redFlags[0].id}`)
        .set('Authorization', `Bearer ${token}`)
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
        .set('Authorization', `Bearer ${token}`)
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
        .set('Authorization', 'Bearer uknown/token')
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
        .set('Authorization', `Bearer ${token}`)
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
        .get(`/api/v1/red-flags/${redFlags[0].id}`)
        .set('Authorization', 'Bearer uknown/token')
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

  describe('PATCH /api/v1/red-flags/<red-flag-id>/status', () => {
    it('it should update the ​red-flag​ record\'s status', (done) => {
      chai.request(server)
        .patch(`/api/v1/red-flags/${redFlags[0].id}/status`)
        .set('Authorization', `Bearer ${token}`)
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
        .patch(`/api/v1/red-flags/${redFlags[0].id}/status`)
        .set('Authorization', 'Bearer uknown/token')
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