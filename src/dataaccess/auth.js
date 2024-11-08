import bcrypt from "bcrypt";

import connection from "../db/connection.js";

const getLoginUser = async (mail) => {
  const [result] = await connection.promise().query(
    'SELECT * FROM `Login` WHERE `correo` = ?',
    [connection.escape(mail)]
  );

  return result[0];
}

const login = async (mail, password) => {
  console.log(mail);
  const [result] = await connection.promise().query(
    'SELECT * FROM `Login` WHERE `correo` = ?',
    [mail]
  );

  console.log(result);

  if (result.length === 0) {
    return null;
  }

  const match = await bcrypt.compare(password, result[0].contraseña);

  if (!match) {
    return null;
  }

  return result[0];
}

export {
  getLoginUser,
  login,
};
