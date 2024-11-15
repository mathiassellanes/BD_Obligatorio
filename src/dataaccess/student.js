import connection from "../db/connection";

const getStudents = async () => {
  const [result] = await connection
    .promise()
    .query("SELECT * FROM `Alumnos`");

  return result;
};

const getStudentsById = async ({ci}) => {
  const [result] = await connection
    .promise()
    .query("SELECT * FROM `Alumnos` WHERE `ci` = ?", [ci]);

  return result;
};

export { getStudents, getStudentsById};
