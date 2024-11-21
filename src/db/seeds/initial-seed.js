/* eslint-disable no-console */

import connection from '../connection.js';
import bcrypt from 'bcrypt';

const adminPassword = bcrypt.hashSync('admin123', 10);

connection.connect();

const createTablesQuery = `
 INSERT INTO Login (correo, contraseña) VALUES ('admin@escuela.com', '${adminPassword}');

-- Datos en Actividades
INSERT INTO Actividades (id, descripcion, costo, edad_minima) VALUES
(1, 'Snowboard', 200.00, 12),
(2, 'Ski', 180.00, 16),
(3, 'Moto de Nieve', 250.00, 20);

-- Datos en Equipamiento
INSERT INTO Equipamiento (id, id_actividad, descripcion, costo) VALUES
(1, 1, 'Tabla de Snowboard', 50.00),
(2, 2, 'Esquíes', 45.00),
(3, 3, 'Casco para Moto de Nieve', 30.00);

-- Datos en Instructores
INSERT INTO Instructores (ci, nombre, apellido) VALUES
('12345678', 'Carlos', 'Pérez'),
('87654321', 'Ana', 'Gómez');

-- Datos en Turnos
INSERT INTO Turnos (id, hora_inicio, hora_fin) VALUES
(1, '09:00:00', '11:00:00'),
(2, '12:00:00', '14:00:00'),
(3, '16:00:00', '18:00:00');

-- Datos en Alumnos
INSERT INTO Alumnos (ci, nombre, apellido, fecha_nacimiento, telefono, correo) VALUES
('11223344', 'Juan', 'López', '2005-06-15', '099123456', 'juan@gmail.com'),
('22334455', 'María', 'Rodríguez', '2007-08-20', '099654321', 'mariaR@gmail.com');

-- Datos en Clase
INSERT INTO Clase (id, ci_instructor, id_actividad, id_turno, dictada, dia_para_dictar) VALUES
(1, '12345678', 1, 1, FALSE, '2021-09-01'),
(2, '87654321', 2, 2, FALSE, '2021-09-02');

-- Datos en Alumno_Clase
INSERT INTO Alumno_Clase (id_clase, ci_alumno, id_equipamiento) VALUES
(1, '11223344', 1),
(2, '22334455', 2);

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
