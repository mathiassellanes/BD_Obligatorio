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
    edad_minima INT NOT NULL DEFAULT 0,
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

  -- Trigger para validar que un alumno no pueda registrarse en dos clases al mismo tiempo
  DELIMITER //
CREATE TRIGGER validar_horario_clase
BEFORE INSERT ON Alumno_Clase
FOR EACH ROW
BEGIN
  DECLARE conflicto INT;

  SELECT COUNT(*)
  INTO conflicto
  FROM Alumno_Clase AC
  JOIN Clase C1 ON AC.id_clase = C1.id
  JOIN Clase C2 ON C2.id = NEW.id_clase
  WHERE AC.ci_alumno = NEW.ci_alumno
    AND C1.id_turno = C2.id_turno
    AND C1.dia_para_dictar = C2.dia_para_dictar;

  IF conflicto > 0 THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'El alumno ya está registrado en otra clase al mismo tiempo.';
  END IF;
END //
DELIMITER ;


  -- Trigger para validar que el alumno tenga la edad suficiente para la actividad
  DELIMITER //
CREATE TRIGGER validar_edad_alumno
BEFORE INSERT ON Alumno_Clase
FOR EACH ROW
BEGIN
  DECLARE edad_alumno INT;

  SELECT TIMESTAMPDIFF(YEAR, A.fecha_nacimiento, CURDATE())
  INTO edad_alumno
  FROM Alumnos A
  WHERE A.ci = NEW.ci_alumno;

  DECLARE edad_requerida INT;

  SELECT edad_minima
  INTO edad_requerida
  FROM Actividades Act
  JOIN Clase C ON Act.id = C.id_actividad
  WHERE C.id = NEW.id_clase;

  IF edad_alumno < edad_requerida THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'El alumno no cumple con la edad mínima requerida para esta actividad.';
  END IF;
END //
DELIMITER ;

  -- Trigger para validar que el alumno use el equipamiento de la clase de la actividad correspondiente
  DELIMITER //
CREATE TRIGGER validar_equipamiento_clase
BEFORE INSERT ON Alumno_Clase
FOR EACH ROW
BEGIN
  DECLARE equipamiento_valido INT;

  SELECT COUNT(*)
  INTO equipamiento_valido
  FROM Equipamiento E
  JOIN Clase C ON E.id_actividad = C.id_actividad
  WHERE E.id = NEW.id_equipamiento
    AND C.id = NEW.id_clase;

  IF equipamiento_valido = 0 THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'El equipamiento no corresponde a la actividad de esta clase.';
  END IF;
END //
DELIMITER ;
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
