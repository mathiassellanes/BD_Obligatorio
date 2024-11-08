import express from 'express';

import activityRouter from './routes/activity.js';
import instructorRouter from './routes/instructor.js';
import classRouter from './routes/class.js';
import turnRouter from './routes/turn.js';
import studentRouter from './routes/student.js';


import connection from './db/connection.js';

const app = express();

connection.connect();

app.use('/activity',activityRouter);
app.get('/instructor', instructorRouter);
app.get('/class', classRouter);
app.get('/turn', turnRouter);
app.get('/student', studentRouter);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
