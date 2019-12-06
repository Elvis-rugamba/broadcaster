CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    phonenumber VARCHAR(20) NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(70) NOT NULL,
    type VARCHAR(10) NOT NULL,
    createdon TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS incidents(
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
    FOREIGN KEY (createdby) REFERENCES users (id) ON UPDATE RESTRICT ON DELETE RESTRICT
);

INSERT INTO users (firstname, lastname, email, phonenumber, username, password, type)
VALUES('Elvis', 'Rugamba', 'elvisrugamba@gmail.com', '0789279774', 'elvis', 
'$2b$10$61MrELSTJ9YzrSFYltRa2uwvsRZlGVySxwfo/qduRIfZf6kvS2Tgi', 'admin'
);

INSERT INTO users (firstname, lastname, email, phonenumber, username, password, type)
VALUES('Elvis', 'Rugamba', 'rugamba@gmail.com', '0789279770', 'rugamba', 
'$2b$10$61MrELSTJ9YzrSFYltRa2uwvsRZlGVySxwfo/qduRIfZf6kvS2Tgi', 'user'
);

INSERT INTO users (firstname, lastname, email, phonenumber, username, password, type)
VALUES('Elvis', 'Rugamba', 'elvis@gmail.com', '0789279771', 'rugamba', 
'$2b$10$61MrELSTJ9YzrSFYltRa2uwvsRZlGVySxwfo/qduRIfZf6kvS2Tgi', 'user'
);

