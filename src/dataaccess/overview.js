import connection from '../db/connection.js';

const actividadesConMasIngresos = async () => {
  const [result] = await connection.promise().query(
    'SELECT * FROM `ActividadesConMasIngresos`'
  );

  return result;
};

const actividadesConMasAlumnos = async () => {
  const [result] = await connection.promise().query(
    'SELECT * FROM `ActividadesConMasAlumnos`'
  );

  return result;
};

const turnosConMasClasesDictadas = async () => {
  const [result] = await connection.promise().query(
    'SELECT * FROM `TurnosConMasClasesDictadas`'
  );

  return result;
};

export {
  turnosConMasClasesDictadas,
  actividadesConMasIngresos,
  actividadesConMasAlumnos,
};
