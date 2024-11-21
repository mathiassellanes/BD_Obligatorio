import { Router } from 'express';
import studentSchema from './validators/student.js';

import {
  getStudents,
  getStudentsByCi,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentsByActivityAvailable,
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

router.get('/activity-available/:id', async (req, res) => {
  const { id } = req.params;

  const studentsByActivityId = await getStudentsByActivityAvailable({ idActividad: id });

  res.json(studentsByActivityId);
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

router.delete('/:ci', async (req, res) => {
  const { ci } = req.params;

  const deletedStudent = await deleteStudent(ci);

  res.json(deletedStudent);
});

export default router;
