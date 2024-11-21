import { parse } from 'date-fns';

export const isTurnActive = (horaInicio, horaFin, diaParaDictar) => {
  const currentDate = new Date();
  const classDate = new Date(diaParaDictar);
  const startTime = parse(horaInicio, 'HH:mm:ss', classDate);
  const endTime = parse(horaFin, 'HH:mm:ss', classDate);

  if (horaInicio > horaFin) {
    endTime.setDate(endTime.getDate() + 1);
  }

  return (
    currentDate.toDateString() === classDate.toDateString() &&
    currentDate >= startTime &&
    currentDate <= endTime
  );
};
