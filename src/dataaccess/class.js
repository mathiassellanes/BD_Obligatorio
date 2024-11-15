import connection from "../db/connection";

const getClass = async () => {
  const [result] = await connection
    .promise()
    .query("SELECT * FROM `Clase`");

  return result;
};

const getClassById = async ({id}) => {
  const [result] = await connection
    .promise()
    .query("SELECT * FROM `Clase` WHERE `id` = ?", [id]);

  return result;
};

export { getClass, getClassById};
