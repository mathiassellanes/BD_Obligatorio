import connection from "../db/connection.js";

const getTurns = async () => {
  const [result] = await connection.promise().query("SELECT * FROM `Turnos`");

  return result;
};

const getTurnsById = async ({id}) => {
  const [result] = await connection
    .promise()
    .query("SELECT * FROM `Turnos` WHERE `id` = ?", [id]);

  return result;
};

export { getTurns, getTurnsById };
