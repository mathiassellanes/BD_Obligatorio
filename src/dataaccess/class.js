import connection from "../db/connection";

const getClass = async (req, res) => {
  const [result] = await connection
    .promise()
    .query("SELECT * FROM `Clase`");

  return result;
};

const getClassId = async (req, res) => {
  const [result] = await connection
    .promise()
    .query("SELECT * FROM `Clase` WHERE `id` = ?", [req.params.id]);

  return result;
};

export { getClass, getClassId};
