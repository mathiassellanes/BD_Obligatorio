import { Router } from 'express';
import classSchema from './validators/class.js';

import { getClass, getClassById, createClass, updateClass } from '../dataaccess/class.js';
import validateSchema from '../middlewares/validator.js';

const router = Router();

router.get('/', async (req, res) => {
  const classes = await getClass();

  res.json(classes);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const classesById = await getClassById({ id });

  res.json(classesById);
});

router.post(
  '/',
  validateSchema(classSchema),
  async (req, res) => {
    const newClass = await createClass(req.body);

    if (newClass.error) {
      res.status(400).json(newClass);
    }

    res.status(201).json(newClass);
  }
);

router.put(
  '/:id',
  validateSchema(classSchema),
  async (req, res) => {
    const { id } = req.params;

    const updatedClass = await updateClass({ id, ...req.body });

    if (updatedClass.error) {
      res.status(400).json(updatedClass);
    }

    res.json(updatedClass);
  }
);

export default router;
