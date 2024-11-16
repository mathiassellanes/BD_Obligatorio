import { Router } from "express";
import classSchema from "./validators/class.js";

import { getClass, getClassById, createClass } from "../dataaccess/class.js";

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
  "/clases",
  validateSchema(classSchema),
  async (req, res) => {
    const newClass = await createClass(body);

    res.json(newClass);
  }
);


export default router;
