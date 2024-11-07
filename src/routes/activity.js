import { Router } from "express";

import connection from "../db/connection.js";

const router = Router();

router.get('/', async (req, res) => {
  const [result] = await connection.promise().query(
    'SELECT * FROM `Actividades`'
  );

  res.json(result);
});

router.get('/:id', async (req, res) => {
  const [result] = await connection.promise().query(
    'SELECT * FROM `Actividades` WHERE `id` = ?',
    [req.params.id]
  );

  res.json(result[0]);
});

export default router;
