import dotenv from 'dotenv';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';
import userData from './data/userData';
import User from '../models/user';

dotenv.config();

const { expect } = chai;

chai.use(chaiHttp);

describe('POST /api/v2/auth/signup', () => {
  before((done) => {
    User.create(userData.user);
    User.create(userData.admin);
    done();
  });
  it('it should create a user account and return auth token', (done) => {
    chai.request(server)
      .post('/api/v2/auth/signup')
      .send(userData.userRegister)
      .then((res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');
        expect(res.body.status).to.be.eql(201);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.property('token');
        done();
      })
      .catch((err) => done(err));
  });

  it('it should not create a user account with invalid email', (done) => {
    chai.request(server)
      .post('/api/v2/auth/signup')
      .send(userData.invalidEmail)
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
    chai.request(server)
      .post('/api/v2/auth/signup')
      .send(userData.existingEmail)
      .then((res) => {
        expect(res).to.have.status(409);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body.status).to.be.eql(409);
        done();
      })
      .catch((err) => done(err));
  });

  it('it should not create a user account with an existing username', (done) => {
    chai.request(server)
      .post('/api/v2/auth/signup')
      .send(userData.existingUserName)
      .then((res) => {
        expect(res).to.have.status(409);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body.status).to.be.eql(409);
        done();
      })
      .catch((err) => done(err));
  });

  it('it should not create a user account with an existing phone number', (done) => {
    chai.request(server)
      .post('/api/v2/auth/signup')
      .send(userData.existingPhoneNumber)
      .then((res) => {
        expect(res).to.have.status(409);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body.status).to.be.eql(409);
        done();
      })
      .catch((err) => done(err));
  });
});

describe('POST /api/v2/auth/signin', () => {
  it('it should login a user and return auth token', (done) => {
    chai.request(server)
      .post('/api/v2/auth/signin')
      .send(userData.userLogin)
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
    chai.request(server)
      .post('/api/v2/auth/signin')
      .send(userData.missingFields)
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
    chai.request(server)
      .post('/api/v2/auth/signin')
      .send(userData.invalidLogin)
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

describe('Not Found', async () => {
  it('it should return 404', (done) => {
    chai.request(server)
      .post('/api/v2/auth/sign')
      .send(userData.noConfirmPassword)
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