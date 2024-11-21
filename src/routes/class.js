import { Router } from 'express';
import classSchema from './validators/class.js';

import { getClass, getClassById, createClass, updateClass, deleteClass } from '../dataaccess/class.js';
import validateSchema from '../middlewares/validator.js';
import { isTurnActive } from '../helpers/dateIsValid.js';

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
      return res.status(400).json(newClass);
    }

    const createdClass = await getClassById({ id: newClass });

    res.status(201).json(createdClass);
  }
);

router.put(
  '/:id',
  validateSchema(classSchema),
  async (req, res) => {
    const { id } = req.params;

    const getClassTurn = await getClassById({ id });

    if (isTurnActive(getClassTurn.turno.horaInicio, getClassTurn.turno.horaFin, getClassTurn.turno.diaParaDictar)) {
      return res.status(400).json({ error: 'No se puede modificar una clase activa' });
    }

    const updatedClass = await updateClass({ id, ...req.body });

    if (updatedClass.error) {
      return res.status(400).json(updatedClass);
    }

    res.json(updatedClass);
  }
);

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const getClassTurn = await getClassById({ id });

  if (isTurnActive(getClassTurn.turno.horaInicio, getClassTurn.turno.horaFin, getClassTurn.turno.diaParaDictar)) {
    return res.status(400).json({ error: 'No se puede eliminar una clase activa' });
  }

  const deletedClass = await deleteClass({ id });

  if (deletedClass.error) {
    return res.status(400).json(deletedClass);
  }

  res.json(deletedClass);
});


export default router;
