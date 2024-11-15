import connection from "../db/connection.js";

const baseQuery = `
SELECT *
FROM \`Clase\`
INNER JOIN \`Instructores\` ON \`Clase\`.\`ci_instructor\` = \`Instructores\`.\`ci\`
INNER JOIN \`Actividades\` ON \`Clase\`.\`id_actividad\` = \`Actividades\`.\`id\`
INNER JOIN \`Turnos\` ON \`Clase\`.\`id_turno\` = \`Turnos\`.\`id\`
`;

const getClass = async () => {
  const [result] = await connection
    .promise()
    .query(baseQuery);

  const formattedResult = result.map((row) => ({
    id: row.id,
    actividad: {
      id: row.id_actividad,
      nombre: row.descripcion,
    },
    turno: {
      horaInicio: row.hora_inicio,
      horaFin: row.hora_fin,
    },
    instructor: {
      ci: row.ci,
      nombre: row.nombre,
      apellido: row.apellido,
    },
    dictada: row.dictada,
  }));

  return formattedResult;
};

const getClassById = async ({ id }) => {
  const [result] = await connection
    .promise()
    .query(`${baseQuery} WHERE \`Clase\`.\`id\` = ?`, [id]);

  const formattedResult = result.map((row) => ({
    id: row.id,
    actividad: {
      id: row.id_actividad,
      nombre: row.descripcion,
    },
    turno: {
      horaInicio: row.hora_inicio,
      horaFin: row.hora_fin,
    },
    instructor: {
      ci: row.ci,
      nombre: row.nombre,
      apellido: row.apellido,
    },
    dictada: row.dictada,
  }));

  return formattedResult;
};

export { getClass, getClassById };
