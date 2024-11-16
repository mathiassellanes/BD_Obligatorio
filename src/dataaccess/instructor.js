import connection from "../db/connection.js";

const getInstructors = async () => {
  const result = await connection
    .promise()
    .query("SELECT * FROM `Instructores`");

  const formattedResult = result.map((row) => ({
    ci: row.ci,
    nombreCompleto: `${row.nombre} ${row.apellido}`,
  }));

  return formattedResult;
};

const getInstructorById = async ({ci}) => {
  const [result] = await connection
    .promise()
    .query("SELECT * FROM `Instructores` WHERE `ci` = ?", [ci]);

  return result;
};

export { getInstructors, getInstructorById };
