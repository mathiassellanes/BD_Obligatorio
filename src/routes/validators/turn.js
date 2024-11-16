import { z } from 'zod';

const turnSchema = z.object({
  id: z.number(),
  starthour: z.date()._addCheck((data) => data.split(':').filter((x) => Number.isInteger(parseInt(x))).length === 3),
  finishhour: z.date()._addCheck((data) => data.split(':').filter((x) => Number.isInteger(parseInt(x))).length === 3)
});

export default turnSchema;
