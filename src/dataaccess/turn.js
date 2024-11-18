import connection from '../db/connection.js';

const getTurns = async () => {
  const [result] = await connection.promise().query('SELECT * FROM `Turnos`');

  const formattedResult = result.map((row) => ({
    id: row.id,
    turno: {
      horaInicio: row.hora_inicio,
      horaFin: row.hora_fin,
    },
  }));

  return formattedResult;
};

const getTurnsById = async ({ id }) => {
  const [result] = await connection
    .promise()
    .query('SELECT * FROM `Turnos` WHERE `id` = ?', [id]);

  const [classes] = await connection
    .promise()
    .query(`SELECT Clase.id AS clase_id, Clase.ci_instructor, Clase.id_actividad, Clase.id_turno, Clase.dictada, Clase.dia_para_dictar,
      Instructores.nombre AS instructor_nombre, Instructores.apellido AS instructor_apellido,
      Actividades.descripcion AS actividad_descripcion,
      Turnos.hora_inicio, Turnos.hora_fin,
      COUNT(Alumno_Clase.ci_alumno) AS cantidadAlumnos
FROM Clase
INNER JOIN Instructores ON Clase.ci_instructor = Instructores.ci
INNER JOIN Actividades ON Clase.id_actividad = Actividades.id
INNER JOIN Turnos ON Clase.id_turno = Turnos.id
LEFT JOIN Alumno_Clase ON Clase.id = Alumno_Clase.id_clase
WHERE Clase.id_turno = ?
GROUP BY Clase.id
`, [id]);

  if (result.length === 0) {
    return null;
  }

  const resultRow = result[0];

  console.log(classes);

  const formattedResult = {
    id: resultRow.id,
    horaInicio: resultRow.hora_inicio,
    horaFin: resultRow.hora_fin,
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

const createTurn = async ({ horaInicio, horaFin }) => {
  const [result] = await connection
    .promise()
    .query(
      'INSERT INTO `Turnos` (`id`, `hora_inicio`, `hora_fin`) VALUES (?, ?, ?)',
      [horaInicio, horaFin]
    );
  return result;
};

const updateTurn = async ({ id, horaInicio, horaFin }) => {
  const [result] = await connection
    .promise()
    .query(
      'UPDATE `Turnos` SET `hora_inicio` = ?, `hora_fin` = ? WHERE `id` = ?',
      [horaInicio, horaFin, id]
    );
  return result;
};

export { getTurns, getTurnsById, createTurn, updateTurn };
