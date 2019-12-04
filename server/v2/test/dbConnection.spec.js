import dotenv from 'dotenv';
import chai from 'chai';
import db from '../db/config';

dotenv.config();
// console.log(db.queryTestConn());
const { expect } = chai;
describe('Test Database', () => {
  it('It should return user data from testusers table', async () => {
    const dbTest = await db.queryTestConn();
    console.log(dbTest);
    expect(dbTest).to.have.property('id');
  });
});