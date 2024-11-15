import connection from "../db/connection.js";

const getActivities = async () => {
  const [result] = await connection
    .promise()
    .query("SELECT * FROM `Actividades`");

  return result;
};

const getActivitiesById = async ({id}) => {
  const [result] = await connection
    .promise()
    .query("SELECT * FROM `Actividades` WHERE `id` = ?", [id]);

  return result;
};

export { getActivities, getActivitiesById };
