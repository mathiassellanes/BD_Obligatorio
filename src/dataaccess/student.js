import connection from "../db/connection";

const getStudents = async (req, res) => {
  const [result] = await connection
    .promise()
    .query("SELECT * FROM `Alumnos`");

  return result;
};

const getStudentsId = async (req, res) => {
  const [result] = await connection
    .promise()
    .query("SELECT * FROM `Alumnos` WHERE `ci` = ?", [req.params.ci]);

  return result;
};

export { getStudents, getStudentsId};
