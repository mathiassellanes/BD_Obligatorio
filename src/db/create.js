/* eslint-disable no-console */

import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const createDatabaseQuery = `
  CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}
`;

connection.query(createDatabaseQuery, (err) => {
  connection.end();

  if (err) {
    console.error('Error creating database: ', err);

    return;
  }

  console.log('Database created successfully');
});

export default connection;
