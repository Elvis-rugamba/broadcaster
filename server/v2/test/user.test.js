import dotenv from 'dotenv';
import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import server from '../../server';
import userData from './data/userData';

dotenv.config();

const { expect } = chai;

describe('POST /api/v1/auth/signup', () => {
  it('it should create a user account and return auth token', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(userData.userRegister)
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
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(userData.missingFields)
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

  it('it should not create a user account with invalid email', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(userData.userRegister)
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

  it('it should not create a user account with an existing email', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
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

  it('it should not create a user account without confirming password', (done) => {
    chai.request(server)
      .post('/api/v2/auth/signup')
      .send(userData.noConfirmPassword)
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