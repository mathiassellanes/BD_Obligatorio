import { z } from 'zod';

const turnSchema = z.object({
  id: z.number().optional(),
  horaFin: z.string().regex(/^\d{2}:\d{2}$/, {
    message: 'Invalid time format. Expected format: HH:MM'
  }),
  horaInicio: z.string().regex(/^\d{2}:\d{2}$/, {
    message: 'Invalid time format. Expected format: HH:MM'
  }),
});

export default turnSchema;
