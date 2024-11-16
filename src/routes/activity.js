import { Router } from 'express';

import { getActivities, getActivitiesById, createActivity } from '../dataaccess/activity.js';

import activitySchema from './validators/activity.js';
import validateSchema from '../middlewares/validator.js';

const router = Router();

router.get('/', async (req, res) => {
  const activities = await getActivities();

  res.json(activities);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const activitiesById = await getActivitiesById({ id });

  res.json(activitiesById);
});

router.post(
  '/actividades',
  validateSchema(activitySchema),
  async (req, res) => {
    const newActivity = await createActivity(req.body);

    res.json(newActivity);
  }
);


export default router;
