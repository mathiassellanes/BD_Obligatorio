import { Router } from "express";

import { getStudentes, getStudentsId } from "../dataaccess/activity.js";

const router = Router();

router.get('/', async (req, res) => {
  const students = await getStudentes();

  res.json(students);
});

router.get('/:ci', async (req, res) => {
  const studentsId = await getStudentsId();

  res.json(studentsId);
});

export default router;
