import { Router } from "express";

import { getStudentes, getStudentsById } from "../dataaccess/activity.js";

const router = Router();

router.get('/', async (req, res) => {
  const students = await getStudentes();

  res.json(students);
});

router.get('/:ci', async (req, res) => {
  const { id } = req.params;

  const studentsById = await getStudentsById({ id });

  res.json(studentsById);
});

export default router;
