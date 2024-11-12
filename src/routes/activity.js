import { Router } from "express";

import { getActivities, getActivitiesId } from "../dataaccess/activity.js";

const router = Router();

router.get("/", async () => {
  const activities = await getActivities();

  res.json(activities);
});

router.get("/:id", async () => {
  const activitiesId = await getActivitiesId();

  res.json(activitiesId);
});

export default router;
