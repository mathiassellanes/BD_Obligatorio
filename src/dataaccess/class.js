import connection from '../db/connection.js';
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
`;
const getClass = async () => {
  const [result] = await connection
    .promise()
    .query(`${baseQuery} GROUP BY Clase.id`);

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
  const [rows] = await connection
    .promise()
    .query(`SELECT Clase.id AS clase_id, Clase.ci_instructor, Clase.id_actividad, Clase.id_turno, Clase.dictada, Clase.dia_para_dictar,
       Instructores.nombre AS instructor_nombre, Instructores.apellido AS instructor_apellido,
       Actividades.descripcion AS actividad_descripcion,
       Turnos.hora_inicio, Turnos.hora_fin,
       Alumnos.ci AS alumno_ci, Alumnos.nombre AS alumno_nombre, Alumnos.apellido AS alumno_apellido, Alumnos.correo as alumno_correo,
        Equipamiento.id AS equipamiento_id, Equipamiento.descripcion AS equipamiento_descripcion
FROM Clase
INNER JOIN Instructores ON Clase.ci_instructor = Instructores.ci
INNER JOIN Actividades ON Clase.id_actividad = Actividades.id
INNER JOIN Turnos ON Clase.id_turno = Turnos.id
LEFT JOIN Alumno_Clase ON Clase.id = Alumno_Clase.id_clase
LEFT JOIN Equipamiento ON Alumno_Clase.id_equipamiento = Equipamiento.id
LEFT JOIN Alumnos ON Alumno_Clase.ci_alumno = Alumnos.ci
WHERE Clase.id = ?`, [id]);

  const classInfo = {
    id: rows[0].clase_id,
    actividad: {
      id: rows[0].id_actividad,
      nombre: rows[0].actividad_descripcion,
    },
    turno: {
      id: rows[0].id_turno,
      horaInicio: rows[0].hora_inicio,
      horaFin: rows[0].hora_fin,
      diaParaDictar: rows[0].dia_para_dictar,
    },
    instructor: {
      ci: rows[0].ci_instructor,
      nombre: rows[0].instructor_nombre,
      apellido: rows[0].instructor_apellido,
    },
    dictada: rows[0].dictada,
    alumnos: rows
      .filter(row => row.alumno_ci)
      .map(row => ({
        ci: row.alumno_ci,
        nombreCompleto: `${row.alumno_nombre} ${row.alumno_apellido}`,
        correo: row.alumno_correo,
        equipamiento: row.equipamiento_id && {
          id: row.equipamiento_id,
          descripcion: row.equipamiento_descripcion,
        },
      })),
  };

  return classInfo;
};

const createClass = async ({ ciInstructor, idActividad, idTurno, diaParaDictar, alumnos }) => {
  try {
    const [insertResult] = await connection
      .promise()
      .query(
        'INSERT INTO `Clase` ( `ci_instructor`, `id_actividad`, `id_turno`, `dia_para_dictar`) VALUES (?, ?, ?, ?)',
        [ciInstructor, idActividad, idTurno, diaParaDictar]
      );

    if (alumnos) {
      const insertValues = alumnos.map(({ ci, idEquipamiento }) => [insertResult.insertId, ci, idEquipamiento]);

      await connection
        .promise()
        .query(
          'INSERT INTO `Alumno_Clase` (`id_clase`, `ci_alumno`, `id_equipamiento`) VALUES ?',
          [insertValues]
        );
    }

    return await getClassById({ id: insertResult.insertId });
  }
  catch (error) {
    return {
      error: error.message,
    };
  }
};

const updateClass = async ({ id, ciInstructor, idActividad, idTurno, diaParaDictar, alumnos }) => {
  try {
    await connection
      .promise()
      .query(
        'UPDATE `Clase` SET `ci_instructor` = ?, `id_actividad` = ?, `id_turno` = ?, `dia_para_dictar` = ? WHERE `id` = ?',
        [ciInstructor, idActividad, idTurno, diaParaDictar, id]
      );

    await connection
      .promise()
      .query(
        'DELETE FROM `Alumno_Clase` WHERE `id_clase` = ?',
        [id]
      );

    if (alumnos) {
      const insertValues = alumnos.map(({ ci, idEquipamiento }) => [id, ci, idEquipamiento]);

      await connection
        .promise()
        .query(
          'INSERT INTO `Alumno_Clase` (`id_clase`, `ci_alumno`, `id_equipamiento`) VALUES ?',
          [insertValues]
        );
    }

    return await getClassById({ id });
  }
  catch (error) {
    return {
      error: error.message,
    };
  }
};

export { getClass, getClassById, createClass, updateClass };
