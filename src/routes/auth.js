import { Router } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { login } from '../dataaccess/auth.js';
import validateSchema from '../middlewares/validator.js';
import loginSchema from './validators/auth.js';

dotenv.config();

const router = Router();

router.post(
  '/login',
  validateSchema(loginSchema),
  async (req, res) => {
    const loginUser = await login(req?.body?.mail, req?.body?.password);

    if (loginUser === null) {
      res.status(401).send('Usuario no encontrado');
      return;
    }

    res.json({
      correo: loginUser.correo,
      token: jwt.sign({ correo: loginUser.correo }, process.env.SECRET_KEY),
    });
  });

export default router;
