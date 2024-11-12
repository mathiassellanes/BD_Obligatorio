import connection from "../db/connection";

const getActivities = async (req, res) => {
  const [result] = await connection
    .promise()
    .query("SELECT * FROM `Actividades`");

  return result;
};

const getActivitiesId = async (req, res) => {
  const [result] = await connection
    .promise()
    .query("SELECT * FROM `Actividades` WHERE `id` = ?", [req.params.id]);

  return result;
};

export { getActivities, getActivitiesId };
