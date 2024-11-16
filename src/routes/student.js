import { Router } from "express";

import {
  getStudents,
  getStudentsById,
  createStudent,
} from "../dataaccess/student.js";
import { body, validationResult } from "express-validator";

const router = Router();

router.get("/", async (req, res) => {
  const students = await getStudents();

  res.json(students);
});

router.get("/:ci", async (req, res) => {
  const { id } = req.params;

  const studentsById = await getStudentsById({ id });

  res.json(studentsById);
});

router.post(
  "/",
  [
    body("ci").isString().notEmpty(),
    body("name").isString().notEmpty(),
    body("lastname").isNumeric().notEmpty(),
    body("birthdate").isNumeric().notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { ci, name, lastname, birthdate } = req.body;
    const newStudent = await createStudent({ ci, name, lastname, birthdate });

    res.status(201).json(newStudent);
  }
);

export default router;
