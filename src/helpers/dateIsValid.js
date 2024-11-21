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

export const getAge = (birthDate) => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const month = today.getMonth() - birth.getMonth();

  if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) {
    age -= 1;
  }

  return age;
};

export const getDateBasedOnAge = (age) => {
  const today = new Date();
  today.setFullYear(today.getFullYear() - age);
  return today;
};
