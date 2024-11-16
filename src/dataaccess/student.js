import connection from "../db/connection.js";

const getStudents = async () => {
  const [result] = await connection
    .promise()
    .query("SELECT * FROM `Alumnos`");

    const formattedResult = result.map((row) => ({
      ci: row.ci,
      nombreCompleto: `${row.nombre} ${row.apellido}`,
      nombre: row.nombre,
      apellido: row.apellido,
      fechaNacimiento: row.fecha_nacimiento,
      telefono: row.telefono,
      correo: row.correo,
    }));

  return formattedResult;
};

const getStudentsById = async ({ci}) => {
  const [result] = await connection
    .promise()
    .query("SELECT * FROM `Alumnos` WHERE `ci` = ?", [ci]);

  return result;
};

export { getStudents, getStudentsById};
