import { Router } from "express";

import { getTurns, getTurnsId } from "../dataaccess/turn.js";

const router = Router();

router.get("/", async () => {
  const turns = await getTurns();

  res.json(turns);
});

router.get("/:id", async () => {
  const turnsId = await getTurnsId();

  res.json(turnsId);
});

export default router;
