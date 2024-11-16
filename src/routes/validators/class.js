import { z } from 'zod';

const classSchema = z.object({
  ciInstructor: z.string().length(8),
  idActividad: z.number(),
  idTurno: z.number(),
  diaParaDictar: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Invalid date format. Expected format: YYYY-MM-DD'
  })
});

export default classSchema;
