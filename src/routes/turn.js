import { Router } from "express";
import { getTurns, getTurnsById } from "../dataaccess/turn.js";

const router = Router();

router.get("/", async (_, res) => {
  const turns = await getTurns();

  res.json(turns);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const turnsById = await getTurnsById({id});

  res.json(turnsById);
});

export default router;
