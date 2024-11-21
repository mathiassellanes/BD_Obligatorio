import { z } from 'zod';

const activitySchema = z.object({
  descripcion: z.string(),
  costo: z.number(),
});

export default activitySchema;
