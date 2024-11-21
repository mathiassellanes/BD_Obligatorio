import connection from '../db/connection.js';
import { getDateBasedOnAge } from '../helpers/dateIsValid.js';
import { getActivitiesById } from './activity.js';

const getStudents = async () => {
  const [result] = await connection.promise().query('SELECT * FROM `Alumnos`');

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

const getStudentByCi = async ({ ci }) => {
  const [result] = await connection
    .promise()
    .query('SELECT * FROM `Alumnos` WHERE ci = ?', [ci]);

  if (result.length === 0) {
    return null;
  }

  const resultRow = result[0];

  const formattedResult = {
    ci: resultRow.ci,
    nombreCompleto: `${resultRow.nombre} ${resultRow.apellido}`,
    nombre: resultRow.nombre,
    apellido: resultRow.apellido,
    fechaNacimiento: resultRow.fecha_nacimiento,
    telefono: resultRow.telefono,
    correo: resultRow.correo,
  };

  return formattedResult;
};

const getStudentsByCi = async ({ ci }) => {
  const [result] = await connection
    .promise()
    .query('SELECT * FROM `Alumnos` WHERE ci = ?', [ci]);

  const [classes] = await connection
    .promise()
    .query(`SELECT Clase.id AS clase_id, Clase.ci_instructor, Clase.id_actividad, Clase.id_turno, Clase.dictada, Clase.dia_para_dictar,
      Instructores.nombre AS instructor_nombre, Instructores.apellido AS instructor_apellido,
      Actividades.descripcion AS actividad_descripcion,
      Turnos.hora_inicio, Turnos.hora_fin,
      Alumnos.ci AS alumno_ci, Alumnos.nombre AS alumno_nombre, Alumnos.apellido AS alumno_apellido, Alumnos.correo as alumno_correo,
       Equipamiento.id AS equipamiento_id, Equipamiento.descripcion AS equipamiento_descripcion
FROM Clase
LEFT JOIN Instructores ON Clase.ci_instructor = Instructores.ci
LEFT JOIN Actividades ON Clase.id_actividad = Actividades.id
LEFT JOIN Turnos ON Clase.id_turno = Turnos.id
LEFT JOIN Alumno_Clase ON Clase.id = Alumno_Clase.id_clase
LEFT JOIN Equipamiento ON Alumno_Clase.id_equipamiento = Equipamiento.id
LEFT JOIN Alumnos ON Alumno_Clase.ci_alumno = Alumnos.ci
WHERE Alumno_Clase.ci_alumno = ?`, [ci]);

  if (result.length === 0) {
    return null;
  }

  const resultRow = result[0];

  const formattedResult = {
    ci: resultRow.ci,
    nombreCompleto: `${resultRow.nombre} ${resultRow.apellido}`,
    nombre: resultRow.nombre,
    apellido: resultRow.apellido,
    fechaNacimiento: resultRow.fecha_nacimiento,
    telefono: resultRow.telefono,
    correo: resultRow.correo,
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
    })),
  };

  return formattedResult;
};

const createStudent = async ({ ci, nombre, apellido, fechaNacimiento, telefono, correo }) => {
  await connection
    .promise()
    .query(
      'INSERT INTO `Alumnos` (`ci`, `nombre`, `apellido`, `fecha_nacimiento`, `telefono`, `correo`) VALUES (?, ?, ?, ?, ?, ?)',
      [ci, nombre, apellido, fechaNacimiento, telefono, correo]
    );

  return getStudentByCi({ ci });
};

const updateStudent = async ({ ci, nombre, apellido, fechaNacimiento, telefono, correo }) => {
  await connection
    .promise()
    .query(
      'UPDATE `Alumnos` SET `nombre` = ?, `apellido` = ?, `fecha_nacimiento` = ?, `telefono` = ?, `correo` = ? WHERE `ci` = ?',
      [nombre, apellido, fechaNacimiento, telefono, correo, ci]
    );


  return getStudentsByCi({ ci });
};

const deleteStudent = async (ci) => {
  await connection
    .promise()
    .query(
      'DELETE FROM `Alumno_Clase` WHERE `ci_alumno` = ?',
      [ci]
    );

  const studentDeleted = await connection
    .promise()
    .query(
      'DELETE FROM `Alumnos` WHERE `ci` = ?',
      [ci]
    );

  return studentDeleted;
};

const getStudentsByActivityAvailable = async ({ idActividad }) => {
  const activity = await getActivitiesById({ id: idActividad });

  const ageMin = activity.edadMinima;

  const minDate = getDateBasedOnAge(ageMin);

  const [result] = await connection
    .promise()
    .query('SELECT * FROM `Alumnos` WHERE fecha_nacimiento <= ?', [minDate]);

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

export {
  getStudents,
  getStudentsByCi,
  createStudent,
  updateStudent,
  getStudentByCi,
  deleteStudent,
  getStudentsByActivityAvailable
};
