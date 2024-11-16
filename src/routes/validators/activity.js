import { z } from 'zod';

const activitySchema = z.object({
  id: z.number(),
  description: z.string(),
  cost: z.number(),
});

export default activitySchema;
