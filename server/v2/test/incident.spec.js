import dotenv from 'dotenv';
import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
import server from '../../server';
import userData from './data/userData';


dotenv.config();

const { expect } = chai;

chai.use(chaiHttp);

describe('Users create red-flag record, edit and delete their red-flags', () => {
  describe('POST /api/v2/red-flags', () => {
    it('it should create a red-flag​ record', (done) => {
      chai.request(server)
        .post('/api/v2/auth/signin')
        .send(userData.userLogin)
        .end((error, response) => {
          chai.request(server)
            .post('/api/v2/red-flags')
            .set('token', `Bearer ${response.body.data.token}`)
            .field('title', 'title test')
            .field('type', 'intervention')
            .field('comment', 'comment test')
            .field('location', '50.5556, -45.5644')
            .attach(
              'images', fs.readFileSync(`${__dirname}/data/sample files/Fishesharvested2.jpg`), 'Fishesharvested2.jpg',
            )
            .attach(
              'videos', fs.readFileSync(`${__dirname}/data/sample files/mov_bbb.mp4`), 'mov_bbb.mp4',
            )
            .then((res) => {
              expect(res).to.have.status(201);
              expect(res.body).to.be.an('object');
              expect(res.body).to.have.property('status');
              expect(res.body).to.have.property('data');
              expect(res.body.status).to.be.eql(201);
              expect(res.body.data).to.be.an('array');
              expect(res.body.data[0]).to.be.an('object');
              expect(res.body.data[0]).to.have.property('id');
              expect(res.body.data[0]).to.have.property('message');
              done();
            })
            .catch((err) => done(err));
        });
    });

    it('it should not create a ​red-flag​ record without being authenticated', (done) => {
      chai.request(server)
        .post('/api/v2/red-flags')
        .set('token', 'Bearer uknown/token')
        .field('title', 'Updated title test')
        .field('type', 'intervention')
        .field('comment', 'comment test')
        .field('location', '50.5556, -45.5644')
        .attach(
          'images', fs.readFileSync(`${__dirname}/data/sample files/Fishesharvested2.jpg`), 'Fishesharvested2.jpg',
        )
        .attach(
          'videos', fs.readFileSync(`${__dirname}/data/sample files/mov_bbb.mp4`), 'mov_bbb.mp4',
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

    it('it should not create a red-flag record with missing required fields', (done) => {
      chai.request(server)
        .post('/api/v2/auth/signin')
        .send(userData.userLogin)
        .end((error, response) => {
          chai.request(server)
            .post('/api/v2/red-flags')
            .set('token', `Bearer ${response.body.data.token}`)
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

    it('it should not create a red-flag record with unsupported image or video file type', (done) => {
      chai.request(server)
        .post('/api/v2/auth/signin')
        .send(userData.userLogin)
        .end((error, response) => {
          chai.request(server)
            .post('/api/v2/red-flags')
            .set('token', `Bearer ${response.body.data.token}`)
            .field('title', 'Updated title test')
            .field('type', 'intervention')
            .field('comment', 'comment test')
            .field('location', '50.5556, -45.5644')
            .attach(
              'images', fs.readFileSync(`${__dirname}/data/sample files/giphy.gif`), 'giphy.gif',
            )
            .attach(
              'videos', fs.readFileSync(`${__dirname}/data/sample files/giphy.gif`), 'giphy.gif',
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
  });

  describe('GET /api/v2/red-flags', () => {
    it('it should fetch all ​red-flag ​records', (done) => {
      chai.request(server)
        .post('/api/v2/auth/signin')
        .send(userData.userLogin)
        .end((error, response) => {
          chai.request(server)
            .get('/api/v2/red-flags')
            .set('token', `Bearer ${response.body.data.token}`)
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
    });

    it('it should not fetch all ​red-flag ​records without being authenticated', (done) => {
      chai.request(server)
        .post('/api/v2/auth/signin')
        .send(userData.userLogin)
        .end((error, response) => {
          chai.request(server)
            .get('/api/v2/red-flags')
            .set('token', 'Bearer uknown/token')
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
  });

  describe('GET /api/v2/red-flags/rdflag-id', () => {
    it('it should fetch specific ​red-flag ​records', (done) => {
      chai.request(server)
        .post('/api/v2/auth/signin')
        .send(userData.userLogin)
        .end((error, response) => {
          chai.request(server)
            .get('/api/v2/red-flags/1')
            .set('token', `Bearer ${response.body.data.token}`)
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
    });

    it('it should not fetch specific ​red-flag ​records without being authenticated', (done) => {
      chai.request(server)
        .post('/api/v2/auth/signin')
        .send(userData.userLogin)
        .end((error, response) => {
          chai.request(server)
            .get('/api/v2/red-flags')
            .set('token', 'Bearer uknown/token')
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

    it('it should not fetch the ​red-flag​ record with invalid ID', (done) => {
      chai.request(server)
        .post('/api/v2/auth/signin')
        .send(userData.userLogin)
        .end((error, response) => {
          chai.request(server)
            .get('/api/v2/red-flags/ui')
            .set('token', `Bearer ${response.body.data.token}`)
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

    it('it should not fetch the ​red-flag​ record with unkown ID', (done) => {
      chai.request(server)
        .post('/api/v2/auth/signin')
        .send(userData.userLogin)
        .end((error, response) => {
          chai.request(server)
            .get('/api/v2/red-flags/12')
            .set('token', `Bearer ${response.body.data.token}`)
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

    it('it should not fetch the ​red-flag​ record with ID thati is not in range of integer', (done) => {
      chai.request(server)
        .post('/api/v2/auth/signin')
        .send(userData.userLogin)
        .end((error, response) => {
          chai.request(server)
            .get('/api/v2/red-flags/12111111111')
            .set('token', `Bearer ${response.body.data.token}`)
            .then((res) => {
              expect(res).to.have.status(500);
              expect(res.body).to.be.an('object');
              expect(res.body).to.have.property('status');
              expect(res.body).to.have.property('error');
              expect(res.body.status).to.be.eql(500);
              done();
            })
            .catch((err) => done(err));
        });
    });

    it('it should not fetch the other user\'s ​red-flag​ record', (done) => {
      chai.request(server)
        .post('/api/v2/auth/signin')
        .send(userData.userLogin)
        .end((error, response) => {
          chai.request(server)
            .get('/api/v2/red-flags/2')
            .set('token', `Bearer ${response.body.data.token}`)
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

  describe('DELETE /api/v2/red-flags/rdflag-id', () => {
    it('it should delete specific ​red-flag ​record', (done) => {
      chai.request(server)
        .post('/api/v2/auth/signin')
        .send(userData.userLogin)
        .end((error, response) => {
          chai.request(server)
            .delete('/api/v2/red-flags/1')
            .set('token', `Bearer ${response.body.data.token}`)
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
    });

    it('it should not delete specific ​red-flag ​records without being authenticated', (done) => {
      chai.request(server)
        .post('/api/v2/auth/signin')
        .send(userData.userLogin)
        .end((error, response) => {
          chai.request(server)
            .delete('/api/v2/red-flags/1')
            .set('token', 'Bearer uknown/token')
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

    it('it should not delete the ​red-flag​ record with invalid ID', (done) => {
      chai.request(server)
        .post('/api/v2/auth/signin')
        .send(userData.userLogin)
        .end((error, response) => {
          chai.request(server)
            .delete('/api/v2/red-flags/ui')
            .set('token', `Bearer ${response.body.data.token}`)
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

    it('it should not delete the ​red-flag​ record with unkown ID', (done) => {
      chai.request(server)
        .post('/api/v2/auth/signin')
        .send(userData.userLogin)
        .end((error, response) => {
          chai.request(server)
            .delete('/api/v2/red-flags/12')
            .set('token', `Bearer ${response.body.data.token}`)
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

    it('it should not delete the ​red-flag​ record with ID thati is not in range of integer', (done) => {
      chai.request(server)
        .post('/api/v2/auth/signin')
        .send(userData.userLogin)
        .end((error, response) => {
          chai.request(server)
            .delete('/api/v2/red-flags/12111111111')
            .set('token', `Bearer ${response.body.data.token}`)
            .then((res) => {
              expect(res).to.have.status(500);
              expect(res.body).to.be.an('object');
              expect(res.body).to.have.property('status');
              expect(res.body).to.have.property('error');
              expect(res.body.status).to.be.eql(500);
              done();
            })
            .catch((err) => done(err));
        });
    });

    it('it should not delete the other user\'s ​red-flag​ record', (done) => {
      chai.request(server)
        .post('/api/v2/auth/signin')
        .send(userData.userLogin)
        .end((error, response) => {
          chai.request(server)
            .delete('/api/v2/red-flags/2')
            .set('token', `Bearer ${response.body.data.token}`)
            .then((res) => {
              expect(res).to.have.status(404 || 403);
              expect(res.body).to.be.an('object');
              expect(res.body).to.have.property('status');
              expect(res.body).to.have.property('error');
              expect(res.body.status).to.be.eql(404 || 403);
              done();
            })
            .catch((err) => done(err));
        });
    });
  });
});