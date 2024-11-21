import { z } from 'zod';

export const instructorSchema = z.object({
  ci: z.string().length(8),
  nombre: z.string(),
  apellido: z.string(),
});

export const editInstructorSchema = instructorSchema.omit({ ci: true });
