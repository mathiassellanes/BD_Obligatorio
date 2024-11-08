import connection from "../connection.js";

connection.connect();

const createTablesQuery = `
  CREATE TABLE Login (
    correo VARCHAR(255) PRIMARY KEY,
    contraseña VARCHAR(255) NOT NULL
  );

  -- Tabla de Actividades
  CREATE TABLE Actividades (
    id VARCHAR(50) PRIMARY KEY,
    descripcion VARCHAR(255) NOT NULL,
    costo DECIMAL(10, 2) NOT NULL
  );

  -- Tabla de Equipamiento
  CREATE TABLE Equipamiento (
    id VARCHAR(50) PRIMARY KEY,
    id_actividad VARCHAR(50),
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
    id VARCHAR(50) PRIMARY KEY,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL
  );

  -- Tabla de Alumnos
  CREATE TABLE Alumnos (
    ci VARCHAR(20) PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    fecha_nacimiento DATE NOT NULL
  );

  -- Tabla de Clase
  CREATE TABLE Clase (
    id VARCHAR(50) PRIMARY KEY,
    ci_instructor VARCHAR(20),
    id_actividad VARCHAR(50),
    id_turno VARCHAR(50),
    dictada BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (ci_instructor) REFERENCES Instructores(ci),
    FOREIGN KEY (id_actividad) REFERENCES Actividades(id),
    FOREIGN KEY (id_turno) REFERENCES Turnos(id)
  );

  -- Tabla de Alumno_Clase (relación entre alumnos y clases)
  CREATE TABLE Alumno_Clase (
    id_clase VARCHAR(50),
    ci_alumno VARCHAR(20),
    id_equipamiento VARCHAR(50),
    PRIMARY KEY (id_clase, ci_alumno),
    FOREIGN KEY (id_clase) REFERENCES Clase(id),
    FOREIGN KEY (ci_alumno) REFERENCES Alumnos(ci),
    FOREIGN KEY (id_equipamiento) REFERENCES Equipamiento(id)
  );

  CREATE TABLE User_Tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    correo_user VARCHAR(255) NOT NULL,
    token VARCHAR(255) NOT NULL,
    FOREIGN KEY (correo_user) REFERENCES Login(correo)
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
