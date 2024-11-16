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
    FOREIGN KEY (ci_instructor) REFERENCES Instructores(ci),
    FOREIGN KEY (id_actividad) REFERENCES Actividades(id),
    FOREIGN KEY (id_turno) REFERENCES Turnos(id),
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
    FOREIGN KEY (id_equipamiento) REFERENCES Equipamiento(id)
  );
`;

const queries = createTablesQuery.split(';').filter(query => query.trim() !== '');

queries.forEach(query => {
  connection.query(query, (err) => {
    if (err) {
      return console.error(err);
    }

    console.log('Table created successfully');
  });
});

connection.end();
