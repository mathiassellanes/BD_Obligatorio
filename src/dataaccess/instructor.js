import connection from "../db/connection";

const getInstructor = async (req, res) => {
  const [result] = await connection
    .promise()
    .query("SELECT * FROM `Instructores`");

  return result;
};

const getInstructorId = async (req, res) => {
  const [result] = await connection
    .promise()
    .query("SELECT * FROM `Instructores` WHERE `ci` = ?", [req.params.ci]);

  return result;
};

export { getInstructor, getInstructorId };
