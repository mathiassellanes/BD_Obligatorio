import connection from "../db/connection.js";
const baseQuery = `
SELECT Clase.id, Clase.ci_instructor, Clase.id_actividad, Clase.id_turno, Clase.dictada, Clase.dia_para_dictar,
       Instructores.nombre, Instructores.apellido,
       Actividades.descripcion,
       Turnos.hora_inicio, Turnos.hora_fin,
       COUNT(Alumno_Clase.ci_alumno) AS cantidadAlumnos
FROM Clase
INNER JOIN Instructores ON Clase.ci_instructor = Instructores.ci
INNER JOIN Actividades ON Clase.id_actividad = Actividades.id
INNER JOIN Turnos ON Clase.id_turno = Turnos.id
LEFT JOIN Alumno_Clase ON Clase.id = Alumno_Clase.id_clase
GROUP BY Clase.id;
`;
const getClass = async () => {
  const [result] = await connection
    .promise()
    .query(baseQuery);

    console.log(result);

  const formattedResult = result.map((row) => ({
    id: row.id,
    actividad: {
      id: row.id_actividad,
      nombre: row.descripcion,
    },
    turno: {
      horaInicio: row.hora_inicio,
      horaFin: row.hora_fin,
      diaParaDictar: row.dia_para_dictar,
    },
    instructor: {
      ci: row.ci,
      nombre: row.nombre,
      apellido: row.apellido,
    },
    dictada: row.dictada,
    cantidadAlumnos: row.cantidadAlumnos,
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
      diaParaDictar: row.dia_para_dictar,
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
