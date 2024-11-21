import connection from '../db/connection.js';

const getActivities = async () => {
  const [result] = await connection
    .promise()
    .query('SELECT * FROM `Actividades`');

  const formattedResult = result.map((row) => ({
    id: row.id,
    descripcion: row.descripcion,
    edadMinima: row.edad_minima,
    costo: row.costo,
  }));

  return formattedResult;
};

const getActivitiesById = async ({ id }) => {
  const [result] = await connection
    .promise()
    .query('SELECT * FROM `Actividades` WHERE `id` = ?', [id]);

  const [classes] = await connection
    .promise()
    .query(`SELECT Clase.id AS clase_id, Clase.ci_instructor, Clase.id_actividad, Clase.id_turno, Clase.dictada, Clase.dia_para_dictar,
      Instructores.nombre AS instructor_nombre, Instructores.apellido AS instructor_apellido,
      Actividades.descripcion AS actividad_descripcion,
      Turnos.hora_inicio, Turnos.hora_fin,
      COUNT(Alumno_Clase.ci_alumno) AS cantidadAlumnos
FROM Clase
LEFT JOIN Instructores ON Clase.ci_instructor = Instructores.ci
LEFT JOIN Actividades ON Clase.id_actividad = Actividades.id
LEFT JOIN Turnos ON Clase.id_turno = Turnos.id
LEFT JOIN Alumno_Clase ON Clase.id = Alumno_Clase.id_clase
WHERE Actividades.id = ?
GROUP BY Clase.id
`, [id]);

  if (result.length === 0) {
    return null;
  }

  const resultRow = result[0];

  const formattedResult = {
    id: resultRow.id,
    descripcion: resultRow.descripcion,
    edadMinima: resultRow.edad_minima,
    costo: resultRow.costo,
    clases: classes.map((row) => ({
      id: row.clase_id,
      actividad: {
        id: row.id_actividad,
        nombre: row.actividad_descripcion,
      },
      turno: {
        id: row.id_turno,
        horaInicio: row.hora_inicio,
        horaFin: row.hora_fin,
        diaParaDictar: row.dia_para_dictar,
      },
      instructor: {
        ci: row.ci_instructor,
        nombre: row.instructor_nombre,
        apellido: row.instructor_apellido,
      },
      dictada: row.dictada,
      cantidadAlumnos: row.cantidadAlumnos,
    })),
  };

  return formattedResult;
};

const editActivity = async ({ id, descripcion, costo, edadMinima }) => {
  await connection
    .promise()
    .query('UPDATE `Actividades` SET `descripcion` = ?, `costo` = ?, `edad_minima` = ? WHERE `id` = ?', [descripcion, costo, edadMinima, id]);

  return getActivitiesById({ id });
};

export { getActivities, getActivitiesById, editActivity };
