import { Router } from "express";

import { getClass, getClassById } from "../dataaccess/class";

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

export default router;
