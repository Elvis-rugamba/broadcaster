import dotenv from 'dotenv';
import chai from 'chai';
import db from '../db/config';

dotenv.config();
const { expect } = chai;
describe('Test Database', () => {
  it('It should return user data from testusers table', async () => {
    const dbTest = await db.queryTestConn();
    expect(process.env.NODE_ENV).to.equal('testing');
    expect(dbTest).to.be.an('object');
    expect(dbTest).to.have.property('id');
  });
});