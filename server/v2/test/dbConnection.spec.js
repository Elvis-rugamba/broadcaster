import dotenv from 'dotenv';
import chai from 'chai';
import db from '../db/config';
import query from '../db/queries';

dotenv.config();
const { expect } = chai;
describe('Test Database', async () => {
  before(
    await db.query(query.createTestUsersTable),
    await db.query(query.createUser),
  );
  after(
    await db.query(query.dropTesUsersTable),
  );
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