import { Router } from 'express';

import { getActivities, getActivitiesById,editActivity } from '../dataaccess/activity.js';

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

router.put('/:id', validateSchema(activitySchema), async (req, res) => {
  const { descripcion, costo, edadMinima } = req.body;
  const { id } = req.params;

  const result = await editActivity({ id, descripcion, costo, edadMinima });

  res.json(result);
});

export default router;
