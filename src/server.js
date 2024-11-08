import express from 'express';

import activityRouter from './routes/activity.js';
import instructorRouter from './routes/instructor.js';
import authRouter from './routes/auth.js';

import connection from './db/connection.js';
import passport from './middlewares/passport.js';


const app = express();

connection.connect();

app.use(express.json());

app.use('/auth', authRouter);

app.use(passport.authenticate('jwt', { session: false }))

app.use('/activity',activityRouter);
app.get('/instructor', instructorRouter);


app.get('/turns', async (req, res) => {
  const [result] = await connection.promise().query(
    'SELECT * FROM `Turnos`'
  );

  res.json(result);
});

app.get('/students', async (req, res) => {
  const [result] = await connection.promise().query(
    'SELECT * FROM `Alumnos`'
  );

  res.json(result);
});

app.get('/students/:ci', async (req, res) => {
  const [result] = await connection.promise().query(
    'SELECT * FROM `Alumnos` WHERE `ci` = ?',
    [req.params.ci]
  );

  res.json(result[0]);
});

app.get('/classes', async (req, res) => {
  const [result] = await connection.promise().query(
    'SELECT * FROM `Clase`'
  );

  res.json(result);
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
