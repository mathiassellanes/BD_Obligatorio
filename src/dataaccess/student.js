import connection from "../db/connection.js";

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

// aca va a haber una funcion que reciba la data por parametros y haga un insert, va a retornar lo insertado y lo mismo en routes

export { getStudents, getStudentsById};
