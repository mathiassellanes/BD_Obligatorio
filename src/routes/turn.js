import { Router } from "express";
import { getTurns, getTurnsById, createTurn } from "../dataaccess/turn.js";
import { turnSchema } from "../schemas/turn.js";

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

router.post(
  "/",
  validateSchema(turnSchema),
  async (req, res) => {
    const newTurn = await createTurn(body);

    res.json(newTurn);
  }
);

export default router;
