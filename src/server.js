/* eslint-disable no-console */

import express from 'express';
import cors from 'cors';

import activityRouter from './routes/activity.js';
import instructorRouter from './routes/instructor.js';
import classRouter from './routes/class.js';
import turnRouter from './routes/turn.js';
import studentRouter from './routes/student.js';
import authRouter from './routes/auth.js';
import equipementRouter from './routes/equipement.js';
import overviewRouter from './routes/overview.js';

import connection from './db/connection.js';
import passport from './middlewares/passport.js';

const app = express();

connection.connect();

app.use(express.json());

app.use(cors({
  origin: '*',
}));

app.use('/auth', authRouter);

app.use(passport.authenticate('jwt', { session: false }));

app.use('/activity',activityRouter);
app.use('/instructor', instructorRouter);
app.use('/class', classRouter);
app.use('/turn', turnRouter);
app.use('/student', studentRouter);
app.use('/equipement', equipementRouter);
app.use('/overview', overviewRouter);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
