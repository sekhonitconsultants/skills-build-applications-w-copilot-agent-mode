import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './config/database';
import { PORT, BASE_URL } from './config/env';
import usersRouter from './routes/users';
import activitiesRouter from './routes/activities';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'Octofit Tracker API' });
});

app.use('/api/users', usersRouter);
app.use('/api/activities', activitiesRouter);

app.listen(PORT, () => {
  console.log(`Octofit Tracker API listening on port ${PORT}`);
  console.log(`API base URL: ${BASE_URL}`);
});
