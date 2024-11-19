import { Router } from 'express';
import studentSchema from './validators/student.js';

import {
  getStudents,
  getStudentsByCi,
  createStudent,
  updateStudent,
} from '../dataaccess/student.js';
import validateSchema from '../middlewares/validator.js';


const router = Router();

router.get('/', async (req, res) => {
  const students = await getStudents();

  res.json(students);
});

router.get('/:ci', async (req, res) => {
  const { ci } = req.params;

  const studentsById = await getStudentsByCi({ ci });

  res.json(studentsById);
});

router.post(
  '/',
  validateSchema(studentSchema),
  async (req, res) => {
    const newStudent = await createStudent(req.body);

    res.json(newStudent);
  }
);

router.put(
  '/:ci',
  validateSchema(studentSchema),
  async (req, res) => {
    const { ci } = req.params;

    const updatedStudent = await updateStudent({ ci, ...req.body });

    res.json(updatedStudent);
  }
);

export default router;
