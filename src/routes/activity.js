import { Router } from "express";

import { getActivities, getActivitiesById } from "../dataaccess/activity.js";

const router = Router();

router.get("/", async (req, res) => {
  const activities = await getActivities();

  res.json(activities);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const activitiesById = await getActivitiesById({ id });

  res.json(activitiesById);
});

export default router;
