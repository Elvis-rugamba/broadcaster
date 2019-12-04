const createUsersTable = `CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    phonenumber VARCHAR(20) NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
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

const dropUsersTable = 'DROP TABLE IF EXISTS users';

const dropIncidentsTable = 'DROP TABLE IF EXISTS incidents';

const createUser = `INSERT INTO users (firstname, lastname, email, phonenumber, username, password, type) 
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;

const findUsers = 'SELECT * FROM users';

const findUserByid = 'SELECT * FROM users WHERE id = $1';

const findUserByEmail = 'SELECT * FROM users WHERE email = $1';

const findUserByUserName = 'SELECT * FROM users WHERE username = $1';

const findUserByPhoneNumber = 'SELECT * FROM users WHERE phonenumber = $1';

const createIncidents = `INSERT INTO incidents (title, type, comment, location, images, videos, createdby, status) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;

const findIncidents = 'SELECT * FROM incidents';

const findIncidentByid = 'SELECT * FROM incidents WHERE id = $1';

const findIncidentByUserid = 'SELECT * FROM incidents WHERE createdby = $1';

export default {
  createUsersTable,
  createIncidentsTable,
  dropUsersTable,
  dropIncidentsTable,
  createUser,
  findUsers,
  findUserByid,
  findUserByEmail,
  findUserByUserName,
  findUserByPhoneNumber,
  createIncidents,
  findIncidents,
  findIncidentByid,
  findIncidentByUserid,
};