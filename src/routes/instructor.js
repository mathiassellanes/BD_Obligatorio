import { Router } from "express";

import { getInstructor, getInstructorById } from "../dataaccess/instructor.js";

const router = Router();

router.get("/", async (req, res) => {
  const instructor = await getInstructor();

  res.json(instructor);
});

router.get("/:ci", async (req, res) => {
  const { id } = req.params;

  const instructorById = await getInstructorById({ id });

  res.json(instructorById);
});

export default router;
