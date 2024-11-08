import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rootpassword',
});

const createDatabaseQuery = `
  CREATE DATABASE IF NOT EXISTS escuela_deportes;
`;

connection.query(createDatabaseQuery, (err) => {
  connection.end();

  if (err) {
    console.error('Error creating database: ', err);

    return;
  }

  console.log('Database created successfully');
})

export default connection;
