import { z } from 'zod';

const loginSchema = z.object({
  mail: z.string().email(),
  password: z.string().min(6)
});

export default loginSchema;
