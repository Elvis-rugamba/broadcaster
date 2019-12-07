const testConn = 'SELECT * FROM users';

const createTestUsersTable = `CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    phonenumber VARCHAR(20) NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(70) NOT NULL,
    type VARCHAR(10) NOT NULL,
    createdon TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL)`;

const createUsersTable = `CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    phonenumber VARCHAR(20) NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(70) NOT NULL,
    type VARCHAR(10) NOT NULL,
    createdon TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL)`;

const createIncidentsTable = `CREATE TABLE IF NOT EXISTS incidents(
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(20) NOT NULL,  
    comment TEXT NOT NULL,
    location VARCHAR(50) NOT NULL,   
    images TEXT [],
    videos TEXT [],
    createdby INT NOT NULL,   
    createdon TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    status VARCHAR(20) DEFAULT 'draft' NOT NULL,
    FOREIGN KEY (createdby) REFERENCES users (id) ON UPDATE RESTRICT ON DELETE RESTRICT)`;

const dropUsersTable = 'DROP TABLE IF EXISTS users CASCADE';

const dropIncidentsTable = 'DROP TABLE IF EXISTS incidents CASCADE';

const dropTesUsersTable = 'DROP TABLE IF EXISTS testusers CASCADE';

const createUser = `INSERT INTO users (firstname, lastname, email, phonenumber, username, password, type) 
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;

const findUsers = 'SELECT * FROM users';

const findUserByid = 'SELECT * FROM users WHERE id = $1';

const findUserByEmail = 'SELECT * FROM users WHERE email = $1';

const findUserByUserName = 'SELECT * FROM users WHERE username = $1';

const findUserByPhoneNumber = 'SELECT * FROM users WHERE phonenumber = $1';

const emailExist = 'SELECT exists(SELECT 1 FROM users WHERE email = $1)';

const phoneNumberExist = 'SELECT exists(SELECT 1 FROM users WHERE phonenumber = $1)';

const userNameExist = 'SELECT exists(SELECT 1 FROM users WHERE username = $1)';

const createIncidents = `INSERT INTO incidents (title, type, comment, location, images, videos, createdby, status) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`;

const findIncidents = 'SELECT * FROM incidents';

const findIncidentByid = 'SELECT * FROM incidents WHERE id = $1';

const findIncidentByUserid = 'SELECT * FROM incidents WHERE createdby = $1';

const findIncidentByUseridAndId = 'SELECT * FROM incidents WHERE createdby = $1 AND id = $2';

const deleteIncidentByUseridAndId = 'DELETE FROM incidents WHERE createdby = $1 AND id = $2';

const updateLocation = 'UPDATE incidents SET location = $1 WHERE createdby = $2 AND id = $3';

export default {
  testConn,
  createTestUsersTable,
  createUsersTable,
  createIncidentsTable,
  dropTesUsersTable,
  dropUsersTable,
  dropIncidentsTable,
  createUser,
  findUsers,
  findUserByid,
  findUserByEmail,
  findUserByUserName,
  findUserByPhoneNumber,
  emailExist,
  userNameExist,
  phoneNumberExist,
  createIncidents,
  findIncidents,
  findIncidentByid,
  findIncidentByUserid,
  findIncidentByUseridAndId,
  deleteIncidentByUseridAndId,
  updateLocation,
};