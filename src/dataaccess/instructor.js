import connection from "../db/connection.js";

const getInstructor = async () => {
  const [result] = await connection
    .promise()
    .query("SELECT * FROM `Instructores`");

  return result;
};

const getInstructorById = async ({ci}) => {
  const [result] = await connection
    .promise()
    .query("SELECT * FROM `Instructores` WHERE `ci` = ?", [ci]);

  return result;
};

export { getInstructor, getInstructorById };
