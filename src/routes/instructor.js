import { Router } from 'express';

import { getInstructors, getInstructorById, createInstructor, updateInstructor } from '../dataaccess/instructor.js';

import { editInstructorSchema, instructorSchema } from './validators/instructor.js';
import validateSchema from '../middlewares/validator.js';

const router = Router();

router.get('/', async (req, res) => {
  const instructor = await getInstructors();

  res.json(instructor);
});

router.get('/:ci', async (req, res) => {
  const { ci } = req.params;

  const instructorById = await getInstructorById({ ci });

  res.json(instructorById);
});

router.post(
  '/',
  validateSchema(instructorSchema),
  async (req, res) => {
    const newInstructor = await createInstructor(req.body);

    res.json(newInstructor);
  }
);

router.put('/:ci',
  validateSchema(editInstructorSchema),
  async (req, res) => {
    const { ci } = req.params;

    const updatedInstructor = await updateInstructor(ci, req.body);

    res.json(updatedInstructor);
  }
);

export default router;
