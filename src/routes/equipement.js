import { Router } from 'express';

import { getEquipement, getEquipementByActiviyId, getEquipementById } from '../dataaccess/equipement.js';

const router = Router();

router.get('/', async (req, res) => {
  const instructor = await getEquipement();

  res.json(instructor);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const instructorById = await getEquipementById({ id });

  res.json(instructorById);
});

router.get('/activity/:id', async (req, res) => {
  const { id } = req.params;

  const instructorById = await getEquipementByActiviyId({ id });

  res.json(instructorById);
});

export default router;
