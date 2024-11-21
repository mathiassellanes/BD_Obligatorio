import { Router } from 'express';
import { getTurns, getTurnsById, createTurn, updateTurn, deleteTurn } from '../dataaccess/turn.js';
import turnSchema from './validators/turn.js';
import validateSchema from '../middlewares/validator.js';

const router = Router();

router.get('/', async (_, res) => {
  const turns = await getTurns();

  res.json(turns);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const turnsById = await getTurnsById({id});

  res.json(turnsById);
});

router.post(
  '/',
  validateSchema(turnSchema),
  async (req, res) => {
    const newTurn = await createTurn(req.body);

    res.json(newTurn);
  }
);

router.put(
  '/:id',
  validateSchema(turnSchema),
  async (req, res) => {
    const { id } = req.params;

    const updatedTurn = await updateTurn({ id, ...req.body });

    res.json(updatedTurn);
  }
);

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const deletedTurn = await deleteTurn(id);

  res.json(deletedTurn);
});

export default router;
