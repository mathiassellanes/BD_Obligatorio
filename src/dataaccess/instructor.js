import connection from "../db/connection.js";

const getInstructors = async () => {
  const [result] = await connection
    .promise()
    .query("SELECT * FROM `Instructores`");

  const formattedResult = result.map((row) => ({
    ci: row.ci,
    nombreCompleto: `${row.nombre} ${row.apellido}`,
  }));

  return formattedResult;
};

const getInstructorById = async ({ ci }) => {
  const [result] = await connection
    .promise()
    .query("SELECT * FROM `Instructores` WHERE `ci` = ?", [ci]);

  const [classes] = await connection.promise().query(
    `SELECT Clase.id AS clase_id, Clase.ci_instructor, Clase.id_actividad, Clase.id_turno, Clase.dictada, Clase.dia_para_dictar,
      Instructores.nombre AS instructor_nombre, Instructores.apellido AS instructor_apellido,
      Actividades.descripcion AS actividad_descripcion,
      Turnos.hora_inicio, Turnos.hora_fin,
      COUNT(Alumno_Clase.ci_alumno) AS cantidadAlumnos
FROM Clase
LEFT JOIN Instructores ON Clase.ci_instructor = Instructores.ci
LEFT JOIN Actividades ON Clase.id_actividad = Actividades.id
LEFT JOIN Turnos ON Clase.id_turno = Turnos.id
LEFT JOIN Alumno_Clase ON Clase.id = Alumno_Clase.id_clase
WHERE Clase.ci_instructor = ?
GROUP BY Clase.id
`,
    [ci]
  );

  if (result.length === 0) {
    return null;
  }

  const resultRow = result[0];

  const formattedResult = {
    ci: resultRow.ci,
    nombreCompleto: `${resultRow.nombre} ${resultRow.apellido}`,
    nombre: resultRow.nombre,
    apellido: resultRow.apellido,
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

const createInstructor = async ({ ci, nombre, apellido }) => {
  try {
    await connection
      .promise()
      .query(
        "INSERT INTO `Instructores` (`ci`, `nombre`, `apellido`) VALUES (?, ?, ?)",
        [ci, nombre, apellido]
      );

    return {
      ci,
      nombre,
      apellido,
      nombreCompleto: `${nombre} ${apellido}`,
    };
  } catch (error) {
    console.error("Error al crear instructor:", error.message);

    if (error.errno === 1644) {
      throw new Error(error.sqlMessage);
    }

    throw new Error("Error interno al crear instructor.");
  }
};

const updateInstructor = async (ci, { nombre, apellido }) => {
  try {
    await connection
      .promise()
      .query(
        "UPDATE `Instructores` SET `nombre` = ?, `apellido` = ? WHERE `ci` = ?",
        [nombre, apellido, ci]
      );

    return {
      ci,
      nombre,
      apellido,
      nombreCompleto: `${nombre} ${apellido}`,
    };
  } catch (error) {
    console.error("Error al actualizar instructor:", error.message);

    if (error.errno === 1644) {
      throw new Error(error.sqlMessage); 
    }

    throw new Error("Error interno al actualizar instructor.");
  }
};

const deleteInstructor = async (ci) => {
  const instructorDeleted = await connection
    .promise()
    .query("DELETE FROM `Instructores` WHERE `ci` = ?", [ci]);

  return instructorDeleted;
};

export {
  getInstructors,
  getInstructorById,
  createInstructor,
  updateInstructor,
  deleteInstructor,
};
