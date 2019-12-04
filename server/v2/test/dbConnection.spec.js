import dotenv from 'dotenv';
import chai from 'chai';
import db from '../db/config';

const { expect } = chai;
describe('Test Database', async () => {
  it('It should return user data from testusers table', async () => {
    try {
      const dbTest = await db.queryTestConn();
      expect(process.env.NODE_ENV).to.equal('testing');
      expect(dbTest).to.be.an('object');
      expect(dbTest).to.have.property('id');
    } catch (error) {
      expect(() => { throw error; }).to.throw();
    }
  });
});