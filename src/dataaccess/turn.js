import connection from "../db/connection";

const getTurns = async (req, res) => {
  const [result] = await connection.promise().query("SELECT * FROM `Turnos`");

  return result;
};

const getTurnsId = async (req, res) => {
  const [result] = await connection
    .promise()
    .query("SELECT * FROM `Turnos` WHERE `id` = ?", [req.params.id]);

  return result;
};

export { getTurns, getTurnsId };
