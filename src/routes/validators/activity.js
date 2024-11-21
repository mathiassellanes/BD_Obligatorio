import { z } from 'zod';

const activitySchema = z.object({
  descripcion: z.string(),
  costo: z.number(),
  edadMinima: z.number(),
});

export default activitySchema;
