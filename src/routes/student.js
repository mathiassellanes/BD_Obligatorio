import { Router } from "express";

import { getStudents, getStudentsById } from "../dataaccess/student.js";

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

export default router;
