import express from 'express';
import Activity from '../models/Activity.js';

const router = express.Router();

router.get('/', async (_req, res, next) => {
  try {
    const activities = await Activity.find().sort({ timestamp: -1 }).limit(20);
    res.json(activities);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(201).json(activity);
  } catch (error) {
    next(error);
  }
});

export default router;
