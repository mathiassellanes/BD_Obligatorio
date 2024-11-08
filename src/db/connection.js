import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: 3307,
  password: 'rootpassword',
  database: 'escuela_deportes',
});

export default connection;
