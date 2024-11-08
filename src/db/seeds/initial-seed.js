import connection from "../connection.js";
import bcrypt from "bcrypt";

const adminPassword = bcrypt.hashSync('admin123', 10);

connection.connect();

const createTablesQuery = `
 INSERT INTO Login (correo, contraseña) VALUES ('admin@escuela.com', '${adminPassword}');

-- Datos en Actividades
INSERT INTO Actividades (id, descripcion, costo) VALUES
('A1', 'Snowboard', 200.00),
('A2', 'Ski', 180.00),
('A3', 'Moto de Nieve', 250.00);

-- Datos en Equipamiento
INSERT INTO Equipamiento (id, id_actividad, descripcion, costo) VALUES
('E1', 'A1', 'Tabla de Snowboard', 50.00),
('E2', 'A2', 'Esquíes', 45.00),
('E3', 'A3', 'Casco para Moto de Nieve', 30.00);

-- Datos en Instructores
INSERT INTO Instructores (ci, nombre, apellido) VALUES
('12345678', 'Carlos', 'Pérez'),
('87654321', 'Ana', 'Gómez');

-- Datos en Turnos
INSERT INTO Turnos (id, hora_inicio, hora_fin) VALUES
('T1', '09:00:00', '11:00:00'),
('T2', '12:00:00', '14:00:00'),
('T3', '16:00:00', '18:00:00');

-- Datos en Alumnos
INSERT INTO Alumnos (ci, nombre, apellido, fecha_nacimiento) VALUES
('11223344', 'Juan', 'López', '2005-06-15'),
('22334455', 'María', 'Rodríguez', '2007-08-20');

-- Datos en Clase
INSERT INTO Clase (id, ci_instructor, id_actividad, id_turno, dictada) VALUES
('C1', '12345678', 'A1', 'T1', FALSE),
('C2', '87654321', 'A2', 'T2', FALSE);

-- Datos en Alumno_Clase
INSERT INTO Alumno_Clase (id_clase, ci_alumno, id_equipamiento) VALUES
('C1', '11223344', 'E1'),
('C2', '22334455', 'E2');

`;

const queries = createTablesQuery.split(';').filter(query => query.trim() !== '');

queries.forEach(query => {
  connection.query(query, (err) => {
    if (err) {
      return console.error(err);
    }

    console.log('Seed ran successfully');
  });
});

connection.end();
