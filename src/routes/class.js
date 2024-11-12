import { Router } from "express";

import { getClass, getClassId } from "../dataaccess/class";

const router = Router();

router.get('/', async (req, res) => {
  const classes = await getClass();

  res.json(classes);
});

router.get('/:id', async (req, res) => {
  const classesId = await getClassId();

  res.json(classesId);
});

export default router;
