import { z } from 'zod';

const studentSchema = z.object({
  ci: z.string().length(8),
  name: z.string(),
  lastname: z.string(),
  birthdate: z.date(),
  mail: z.string().email(),
  phone: z.string().length(9)
});

export default studentSchema;
