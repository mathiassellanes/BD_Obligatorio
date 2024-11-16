import { Router } from 'express';
import studentSchema from './validators/student.js';

import {
  getStudents,
  getStudentsById,
  createStudent,
} from '../dataaccess/student.js';
import validateSchema from '../middlewares/validator.js';


const router = Router();

router.get('/', async (req, res) => {
  const students = await getStudents();

  res.json(students);
});

router.get('/:ci', async (req, res) => {
  const { id } = req.params;

  const studentsById = await getStudentsById({ id });

  res.json(studentsById);
});

router.post(
  '/alumnos',
  validateSchema(studentSchema),
  async (req, res) => {
    const newStudent = await createStudent(req.body);

    res.json(newStudent);
  }
);

export default router;
