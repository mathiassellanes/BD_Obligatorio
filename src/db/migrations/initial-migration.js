/* eslint-disable no-console */

import connection from "../connection.js";

connection.connect();

const createTablesQuery = `
  CREATE TABLE Login (
    correo VARCHAR(255) PRIMARY KEY,
    contraseña VARCHAR(255) NOT NULL
  );

  -- Tabla de Actividades
  CREATE TABLE Actividades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(255) NOT NULL,
    costo DECIMAL(10, 2) NOT NULL
  );

  -- Tabla de Equipamiento
  CREATE TABLE Equipamiento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_actividad INT,
    descripcion VARCHAR(255) NOT NULL,
    costo DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_actividad) REFERENCES Actividades(id)
  );

  -- Tabla de Instructores
  CREATE TABLE Instructores (
    ci VARCHAR(20) PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL
  );

  -- Tabla de Turnos
  CREATE TABLE Turnos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL
  );

  -- Tabla de Alumnos
  CREATE TABLE Alumnos (
    ci VARCHAR(20) PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    correo VARCHAR(255) NOT NULL
  );

  -- Tabla de Clase
  CREATE TABLE Clase (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ci_instructor VARCHAR(20),
    id_actividad INT,
    id_turno INT,
    dictada BOOLEAN NOT NULL DEFAULT FALSE,
    dia_para_dictar DATE NOT NULL,
    FOREIGN KEY (ci_instructor) REFERENCES Instructores(ci) ON DELETE SET NULL,
    FOREIGN KEY (id_actividad) REFERENCES Actividades(id),
    FOREIGN KEY (id_turno) REFERENCES Turnos(id) ON DELETE SET NULL,
    UNIQUE (ci_instructor, id_turno, dia_para_dictar)
  );

  -- Tabla de Alumno_Clase (relación entre alumnos y clases)
  CREATE TABLE Alumno_Clase (
    id_clase INT,
    ci_alumno VARCHAR(20),
    id_equipamiento INT,
    PRIMARY KEY (id_clase, ci_alumno),
    FOREIGN KEY (id_clase) REFERENCES Clase(id),
    FOREIGN KEY (ci_alumno) REFERENCES Alumnos(ci),
    FOREIGN KEY (id_equipamiento) REFERENCES Equipamiento(id) ON DELETE SET NULL
  );

  -- Vista de Actividades que más ingresos generan
  CREATE VIEW ActividadesConMasIngresos
  AS
  SELECT a.id AS id_actividad, a.descripcion AS actividad, (a.costo + COALESCE(SUM(e.costo), 0)) * COUNT(ac.id_clase) AS ingresos_totales
  FROM Actividades a
  LEFT JOIN Clase c ON a.id = c.id_actividad
  LEFT JOIN Alumno_Clase ac ON c.id = ac.id_clase
  LEFT JOIN Equipamiento e ON e.id = ac.id_equipamiento
  GROUP BY a.id, a.descripcion, a.costo
  ORDER BY ingresos_totales DESC;

  -- Vista de Actividades con más alumnos
  CREATE VIEW ActividadesConMasAlumnos
  AS
  SELECT a.id AS id_actividad, a.descripcion AS actividad, COUNT(ac.ci_alumno) AS total_alumnos
  FROM Actividades a
  LEFT JOIN Clase c ON a.id = c.id_actividad
  LEFT JOIN Alumno_Clase ac ON c.id = ac.id_clase
  GROUP BY a.id, a.descripcion
  ORDER BY total_alumnos DESC;

  -- Vista de turnos con más clases dictadas
  CREATE VIEW TurnosConMasClasesDictadas
  AS
  SELECT t.id AS id_turno, CONCAT(t.hora_inicio, ' - ', t.hora_fin) AS horario, COUNT(c.id) AS total_clases_dictadas
  FROM Turnos t
  LEFT JOIN Clase c ON t.id = c.id_turno AND c.dictada = TRUE
  GROUP BY t.id, t.hora_inicio, t.hora_fin
  ORDER BY total_clases_dictadas DESC;

  -- Trigger de Instructores
  CREATE TRIGGER before_instructor_insert
  BEFORE INSERT ON Instructores
  FOR EACH ROW
  BEGIN
    IF EXISTS (SELECT 1 FROM Instructores WHERE ci = NEW.ci) THEN
      SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'El instructor con esta cédula ya existe.';
    END IF;
  END;

  CREATE TRIGGER before_instructor_update
  BEFORE UPDATE ON Instructores
  FOR EACH ROW
  BEGIN
    IF EXISTS (SELECT 1 FROM Instructores WHERE ci = NEW.ci AND ci != OLD.ci) THEN
      SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'El instructor con esta cédula ya existe.';
    END IF;
  END;

  -- Trigger de Turnos
  CREATE TRIGGER before_turno_update
  BEFORE UPDATE ON Turnos
  FOR EACH ROW
  BEGIN
    IF EXISTS (SELECT 1 FROM Turnos WHERE id = NEW.id AND id != OLD.id) THEN
      SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'El turno con este id ya existe.';
    END IF;
  END;

  -- Trigger de Actividades
  CREATE TRIGGER before_actividad_insert
  BEFORE INSERT ON Actividades
  FOR EACH ROW
  BEGIN
    IF EXISTS (SELECT 1 FROM Actividades WHERE id = NEW.id) THEN
      SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'La actividad con este id ya existe.';
    END IF;
  END;

  CREATE TRIGGER before_actividad_update
  BEFORE UPDATE ON Actividades
  FOR EACH ROW
  BEGIN
    IF EXISTS (SELECT 1 FROM Actividades WHERE id = NEW.id AND id != OLD.id) THEN
      SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'La actividad con este id ya existe.';
    END IF;
  END;

  -- Trigger de Equipamiento
  --CREATE TRIGGER before_equipamiento_insert
  --BEFORE INSERT ON Equipamiento
  --FOR EACH ROW
  --BEGIN
  --  IF EXISTS (SELECT 1 FROM Equipamiento WHERE id = NEW.id) THEN
  --    SIGNAL SQLSTATE '45000'
  --    SET MESSAGE_TEXT = 'El equipamento con este id ya existe.';
  --  END IF;
  --END;

  --CREATE TRIGGER before_equipamiento_update
  --BEFORE UPDATE ON Equipamiento
  --FOR EACH ROW
  --BEGIN
  --  IF EXISTS (SELECT 1 FROM Equipamiento WHERE id = NEW.id AND id != OLD.id) THEN
  --    SIGNAL SQLSTATE '45000'
  --    SET MESSAGE_TEXT = 'El equipamento con este id ya existe.';
  --  END IF;
  --END;

  -- Trigger de Alumnos
  CREATE TRIGGER before_alumno_insert
  BEFORE INSERT ON Alumnos
  FOR EACH ROW
  BEGIN
    IF EXISTS (SELECT 1 FROM Alumnos WHERE id = NEW.id) THEN
      SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'El alumno con este id ya existe.';
    END IF;
  END;

  CREATE TRIGGER before_alumno_update
  BEFORE UPDATE ON Alumnos
  FOR EACH ROW
  BEGIN
    IF EXISTS (SELECT 1 FROM Alumnos WHERE id = NEW.id AND id != OLD.id) THEN
      SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'El alumno con este id ya existe.';
    END IF;
  END;

  -- Trigger de Clase
  CREATE TRIGGER before_clase_insert
  BEFORE INSERT ON Clase
  FOR EACH ROW
  BEGIN
    IF EXISTS (SELECT 1 FROM Clase WHERE id = NEW.id) THEN
      SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'La clase con este id ya existe.';
    END IF;
  END;

  CREATE TRIGGER before_clase_update
  BEFORE UPDATE ON Clase
  FOR EACH ROW
  BEGIN
    IF EXISTS (SELECT 1 FROM Clase WHERE id = NEW.id AND id != OLD.id) THEN
      SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'La clase con este id ya existe.';
    END IF;
  END;
`;

const queries = createTablesQuery
  .split(";")
  .filter((query) => query.trim() !== "");

queries.forEach((query) => {
  connection.query(query, (err) => {
    if (err) {
      return console.error(err);
    }

    console.log("Table created successfully");
  });
});

connection.end();
