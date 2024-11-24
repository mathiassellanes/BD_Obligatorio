import connection from '../db/connection.js';

export const updateClasses = (classes) => {
  const currentDate = new Date();

  if (Array.isArray(classes)) {
    return classes.map((clase) => {
      const classDate = new Date(clase.turno.diaParaDictar);
      const [horaInicio, minutoInicio] = clase.turno.horaInicio.split(':').map(Number);
      classDate.setHours(horaInicio, minutoInicio);

      if (classDate < currentDate) {
        connection
          .promise()
          .query(
            'UPDATE `Clase` SET `dictada` = ? WHERE `id` = ?',
            [true, clase.id]
          );

        clase.dictada = true;
      }

      return clase;
    });
  }

  const clase = classes;

  const classDate = new Date(clase.turno.diaParaDictar);
  const [horaInicio, minutoInicio] = clase.turno.horaInicio.split(':').map(Number);
  classDate.setHours(horaInicio, minutoInicio);

  if (classDate < currentDate) {
    connection
      .promise()
      .query(
        'UPDATE `Clase` SET `dictada` = ? WHERE `id` = ?',
        [true, clase.id]
      );

    clase.dictada = true;
  }

  return clase;
};
