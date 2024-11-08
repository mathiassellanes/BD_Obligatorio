import { Router } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { login } from "../dataaccess/auth.js";

dotenv.config();

const router = Router();

router.post('/login', async (req, res) => {
  console.log(req.body)
  const loginUser = await login(req?.body?.mail, req?.body?.password);

  if (loginUser === null) {
    res.status(401).send('Usuario no encontrado');
    return;
  }

  console.log(process.env)

  res.json({
    correo: loginUser.correo,
    token: jwt.sign({ correo: loginUser.correo }, process.env.SECRET_KEY),
  });
});

export default router;
