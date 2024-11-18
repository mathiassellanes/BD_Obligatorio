import { Router } from 'express';


import instructorSchema from './validators/instructor.js';
import validateSchema from '../middlewares/validator.js';
import { getEquipement, getEquipementById } from '../dataaccess/equipement.js';

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


export default router;
