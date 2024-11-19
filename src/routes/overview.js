import { Router } from 'express';

import {
  turnosConMasClasesDictadas,
  actividadesConMasIngresos,
  actividadesConMasAlumnos,
} from '../dataaccess/overview.js';


const router = Router();

router.get('/', async (req, res) => {
  const turns = await turnosConMasClasesDictadas();
  const activities = await actividadesConMasIngresos();
  const students = await actividadesConMasAlumnos();

  res.json({
    turns,
    activities,
    students
  });
});

export default router;
