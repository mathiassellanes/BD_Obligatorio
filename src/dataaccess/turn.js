import connection from "../db/connection.js";

const getTurns = async () => {
  const [result] = await connection.promise().query("SELECT * FROM `Turnos`");

  const formattedResult = result.map((row) => ({
    id: row.id,
    turno: {
      horaInicio: row.hora_inicio,
      horaFin: row.hora_fin,
    },
  }));

  return formattedResult;
};

const getTurnsById = async ({id}) => {
  const [result] = await connection
    .promise()
    .query("SELECT * FROM `Turnos` WHERE `id` = ?", [id]);

  return result;
};

const createTurn = async ({ id, horaInicio, horaFin }) => {
  const [result] = await connection
    .promise()
    .query(
      "INSERT INTO `Turnos` (`id`, `hora_inicio`, `hora_fin`) VALUES (?, ?, ?)",
      [id, horaInicio, horaFin]
    );
  return result;
};

export { getTurns, getTurnsById, createTurn };
