import express from 'express';
import cors from 'cors';
import session from 'express-session';

import itemsRouter from './routes/items.js';
import authRouter from './routes/auth.js';
import activitiesRouter from './routes/activities.js';

const app = express();

app.use(
  cors({
    origin: (_origin, callback) => callback(null, true),
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'warehouse-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 8, // 8 hours
    },
  })
);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/items', itemsRouter);
app.use('/api/auth', authRouter);
app.use('/api/activities', activitiesRouter);

app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
  });
});

export default app;

