import { Router } from "express";

import { getInstructors, getInstructorById } from "../dataaccess/instructor.js";

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

export default router;
