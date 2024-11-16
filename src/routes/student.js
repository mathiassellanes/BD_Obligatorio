import { Router } from "express";

import { getStudents, getStudentsById } from "../dataaccess/student.js";
import { body, validationResult } from 'express-validator';
import { createStudent } from "../dataaccess/student.js";

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
  '/',
  [
    body('name').isString().notEmpty(),
    body('lastname').isString().notEmpty(),
    body('ci').isNumeric().notEmpty(),
    body('birthdate').isNumeric().notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, lastname, ci, birthdate } = req.body;
    const newStudent = await createStudent({ name, lastname, ci, birthdate });

    res.status(201).json(newStudent);
  }
);

export default router;
