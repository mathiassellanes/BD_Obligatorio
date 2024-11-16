import { z } from 'zod';

const turnSchema = z.object({
  ci: z.string().length(8),
  name: z.string(),
  lastname: z.string(),
});

export default turnSchema;
