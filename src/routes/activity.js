import { Router } from "express";

import { getActivities, getActivitiesById } from "../dataaccess/activity.js";

const router = Router();

router.get("/", async () => {
  const activities = await getActivities();

  res.json(activities);
});

router.get("/:id", async () => {
  const { id } = req.params;

  const activitiesById = await getActivitiesById({ id });

  res.json(activitiesById);
});

export default router;
