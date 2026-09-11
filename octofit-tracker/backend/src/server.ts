import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './config/database';
import usersRouter from './routes/users';
import activitiesRouter from './routes/activities';

dotenv.config();

const app = express();
const PORT = 8000;

// Codespaces-aware base URL: use the forwarded Codespaces URL when available, else localhost
const codespaceName = process.env.CODESPACE_NAME;
const BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

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
