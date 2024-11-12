import { Router } from "express";

import { getInstructor, getInstructorId } from "../dataaccess/instructor";

const router = Router();

router.get("/", async (req, res) => {
  const instructor = await getInstructor();

  res.json(instructor);
});

router.get("/:ci", async (req, res) => {
  const instructorId = await getInstructorId();

  res.json(instructorId);
});

export default router;
