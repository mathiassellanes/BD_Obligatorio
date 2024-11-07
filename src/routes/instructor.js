import { Router } from "express";

import connection from "../db/connection.js";

const router = Router();

router.get('/', async (req, res) => {
  const [result] = await connection.promise().query(
    'SELECT * FROM `Instructores`'
  );

  res.json(result);
});

router.get('/:ci', async (req, res) => {
  const [result] = await connection.promise().query(
    'SELECT * FROM `Instructores` WHERE `ci` = ?',
    [req.params.ci]
  );

  res.json(result[0]);
});

export default router;
