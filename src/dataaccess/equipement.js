import connection from '../db/connection.js';

const getEquipement = async () => {
  const [result] = await connection
    .promise()
    .query('SELECT * FROM `Equipamiento`');

  const formattedResult = result.map((row) => ({
    id: row.id,
    descripcion: row.descripcion,
  }));

  return formattedResult;
};

const getEquipementById = async ({ id }) => {
  const [result] = await connection
    .promise()
    .query('SELECT * FROM `Equipamiento` WHERE `id` = ?', [id]);

  return result;
};

const getEquipementByActiviyId = async ({ id }) => {
  const [result] = await connection
    .promise()
    .query('SELECT * FROM `Equipamiento` WHERE `id_actividad` = ?', [id]);

  return result;
};

const getEquipementByIdAndActivityId = async ({ id, idActividad }) => {
  const [result] = await connection
    .promise()
    .query('SELECT * FROM `Equipamiento` WHERE `id` = ? AND `id_actividad` = ?', [id, idActividad]);

  return result[0];
};

export { getEquipementById, getEquipement, getEquipementByActiviyId, getEquipementByIdAndActivityId };
