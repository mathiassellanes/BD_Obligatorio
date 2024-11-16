import { Router } from "express";
import instructorSchema from "./validators/instructor.js";

import { getInstructors, getInstructorById, createInstructor } from "../dataaccess/instructor.js";

const router = Router();

router.get("/", async (req, res) => {
  const instructor = await getInstructors();

  res.json(instructor);
});

router.get("/:ci", async (req, res) => {
  const { id } = req.params;

  const instructorById = await getInstructorById({ id });

  res.json(instructorById);
});

router.post(
  "/instrucores",
  validateSchema(instructorSchema),
  async (req, res) => {
    const newInstructor = await createInstructor(body);

    res.json(newInstructor);
  }
);

export default router;
