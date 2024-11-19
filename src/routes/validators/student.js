import { z } from 'zod';

const studentSchema = z.object({
  ci: z.string().length(8).optional(),
  nombre: z.string(),
  apellido: z.string(),
  fechaNacimiento: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Invalid date format. Expected format: YYYY-MM-DD'
  }),
  correo: z.string().email(),
  telefono: z.string().length(9)
});

export default studentSchema;
